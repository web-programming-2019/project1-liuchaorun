import os

from flask import Flask, request, jsonify, session
from flask_session import Session
import models
import datetime

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
            return returns(3, '', 'password or nickname error')
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
    if user_id is None:
        return returns('4', '', 'need login again')
    if data.__contains__('isbn') and data.__contains__('author') and data.__contains__('title'):

    else:
        returns(5, '', 'isbn author title missing')

    return returns(200, 'success', '')


@app.route("/server/book/getDetail", methods=['post'])
def detail():
    data = request.get_json()
    return returns(200, 'success', '')


@app.route("/server/book/comment", methods=['post'])
def comment():
    data = request.get_json()
    return returns(200, 'success', '')
