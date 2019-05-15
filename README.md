# Project 1

Web Programming with Python and JavaScript

## run
使用了本地数据库PostgreSQL，需设置用户postgres，密码为postgres，database为books，数据库端口为5432
```shell
$ export FLASK_APP=application.py
$ export FLASK_DEBUG=1
$ export DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/books
$ flask run
```
