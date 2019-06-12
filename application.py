import os

from flask import Flask, request, jsonify, session
from flask_session import Session
import models
import datetime
from spider import spider

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
db = models.create(os.getenv("DATABASE_URL")).session_factory()


def returns(code, data, msg):
    return jsonify({'code': code, 'data': data, 'msg': msg})


@app.route("/server/user/signup", methods=["post"])
def signup():
    data = request.get_json()
    if data.__contains__('nickname') and data.__contains__('password'):
        users = db.query(models.User).filter(models.User.nickname == data['nickname']).all()
        if len(users) == 0:
            db.add(
                models.User(nickname=data['nickname'], password=data['password'], createdTime=datetime.datetime.now()))
            db.commit()
        else:
            return returns(0, '', 'user already exist')
    else:
        return returns(1, '', 'missing nickname or password')
    return returns(200, 'success', '')


@app.route("/server/user/login", methods=['post'])
def login():
    data = request.get_json()
    if data.__contains__('nickname') and data.__contains__('password'):
        users = db.query(models.User).filter(models.User.nickname == data['nickname']).all()
        if len(users) == 0:
            return returns(2, '', 'please signup first')
        elif users[0].password != data['password']:
            return returns(1, '', 'password or nickname error')
        else:
            session['userId'] = users[0].id
    else:
        return returns(1, '', 'missing nickname or password')
    return returns(200, 'success', '')


@app.route("/server/user/logout", methods=['get'])
def logout():
    session.pop('userId')
    return returns(200, 'success', '')


@app.route("/server/book/search", methods=['post', 'get'])
def search():
    data = request.get_json()
    user_id = session.get("userId")
    books_data = []
    if user_id is None:
        return returns('2', '', 'need login again')
    if data.__contains__('page'):
        page = int(data['page'])
    else:
        page = 1
    if data.__contains__('isbn') and data.__contains__('author') and data.__contains__('title'):
        params = []
        if data.__contains__('isbn'):
            params.append(models.Book.isbn.like("%"+data['isbn']+"%"))
        if data.__contains__('author'):
            params.append(models.Book.author.like("%"+data['author']+"%"))
        if data.__contains__('title'):
            params.append(models.Book.title.like("%"+data['title']+"%"))
        books = db.query(models.Book).filter(*params).offset((page - 1) * 10).limit(10)
        for book in books:
            books_data.append({
                "id": book.id,
                "isbn": book.isbn,
                "author": book.author,
                "title": book.title,
                "year": book.year
            })
    else:
        returns(1, '', 'isbn author title missing')
    return returns(200, {'data': books_data, 'total': len(db.query(models.Book).filter(*params).all())}, '')


@app.route("/server/book/getDetail", methods=['post'])
def detail():
    data = request.get_json()
    user_id = session.get("userId")
    if user_id is None:
        return returns('2', '', 'need login again')
    if not data.__contains__('id'):
        return returns('1', '', 'id missing')
    book_data = db.query(models.Book).filter(models.Book.id == data['id']).all()
    comments = db.query(models.Comment).filter(models.Comment.bookId == book_data[0].id).order_by(models.Comment.createdTime.desc())
    comment_data = []
    for c in comments:
        comment_data.append({
            "content": c.text,
            "datetime": c.createdTime.strftime("%Y-%m-%d %H:%M:%S"),
            "author": db.query(models.User).filter(models.User.id == c.userId).all()[0].nickname,
            "score": c.score
        })

    #s_d = spider(book_data[0].isbn)
    s_d = 5
    return_data = {
        "bookDetails": {
            "id": book_data[0].id,
            "isbn": book_data[0].isbn,
            "author": book_data[0].author,
            "title": book_data[0].title,
            "year": book_data[0].year,
            "goodReads": s_d,
        },
        "comments": comment_data
    }
    return returns(200, return_data, '')


@app.route("/server/book/comment", methods=['post'])
def comment():
    data = request.get_json()
    user_id = session.get("userId")
    if user_id is None:
        return returns('2', '', 'need login again')
    if data.__contains__('score') and data.__contains__('text') and data.__contains__('bookId'):
        book_id = data['bookId']
        score = float(data['score'])
        print(score)
        if score > 5:
            return returns('1', '', 'score or text error')
        text = data['text']
        c = models.Comment(text=text, score=score, createdTime=datetime.datetime.now(), userId=user_id, bookId=book_id)
        db.add(c)
        db.commit()
    else:
        return returns('1', '', 'score or text missing')
    return returns(200, 'success', '')


@app.route("/api/<isbn>", methods=['get'])
def getIsbn(isbn):
    book_data = db.query(models.Book).filter(models.Book.isbn == isbn).all()
    comments = db.query(models.Comment).filter(models.Comment.bookId == book_data[0].id).order_by(models.Comment.createdTime.desc())
    average_score = 0
    review_count = 0
    for c in comments:
        review_count += 1
        average_score += c.score

    average_score = average_score / review_count
    return_data = {
        "isbn": book_data[0].isbn,
        "author": book_data[0].author,
        "title": book_data[0].title,
        "year": book_data[0].year,
        "review_count": review_count,
        "average_score": average_score
    }
    return jsonify(return_data)
