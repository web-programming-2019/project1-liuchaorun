import models
import csv

db = models.create("postgresql://postgres:postgres@127.0.0.1:5432/books")
session = db.session_factory()

books = csv.reader(open('./books.csv'))

lines = 0
dbBooks = []
for book in books:
    if lines == 0:
        lines = 1
    else:
        lines += 1
        dbBooks.append(models.Book(isbn=book[0], title=book[1], author=book[2], year=book[3]))

session.add_all(dbBooks)
session.commit()
