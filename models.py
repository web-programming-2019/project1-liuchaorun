from sqlalchemy import Column, String, create_engine, ForeignKey, TIMESTAMP, INTEGER
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker, relationship

base = declarative_base()


class User(base):
    __tablename__ = 'User'

    id = Column(INTEGER, autoincrement=True, primary_key=True)
    nickname = Column(String, nullable=False)
    password = Column(String, nullable=False)
    createdTime = Column(TIMESTAMP, nullable=False)

    Comment = relationship("Comment", back_populates="User")


class Book(base):
    __tablename__ = 'Book'

    id = Column(INTEGER, autoincrement=True, primary_key=True)
    isbn = Column(String(10), nullable=False)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    year = Column(String, nullable=False)

    Comment = relationship("Comment", back_populates="Book")


class Comment(base):
    __tablename__ = 'Comment'

    id = Column(INTEGER, autoincrement=True, primary_key=True)
    text = Column(String, nullable=False)
    createdTime = Column(TIMESTAMP, nullable=False)

    userId = Column(INTEGER, ForeignKey('User.id'))
    User = relationship("User", back_populates="Comment")

    bookId = Column(INTEGER, ForeignKey("Book.id"))
    Book = relationship("Book", back_populates="Comment")


def create(postgresUrl):
    engine = create_engine(postgresUrl)
    base.metadata.create_all(engine)
    db = scoped_session(sessionmaker(bind=engine))
    return db
