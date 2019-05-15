import os

from flask import Flask, session
from flask_session import Session
from sqlalchemy import create_engine, String, Column
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
# base = declarative_base()
#
#
# class User(base):
#     __tablename__ = 'user'
#
#     phone = Column(String(11), primary_key=True)
#     password = Column(String(64))
#
#
# class Book(base):
#     __tablename__ = 'book'
#
#     isbn = Column()
#     title = Column()
#     author = Column()
#     year = Column()
#

engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))


@app.route("/")
def index():
    return "Project 1: TODO"
