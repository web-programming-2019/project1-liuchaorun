# key: fCJUTsj0cvGRJJvRslnvnw
# secret: zno7ve4MfSaiyaKrH2PO2xTkItbKES4BLhI8NwM9TvM
import requests


def spider(isbn):
    res = requests.get("https://www.goodreads.com/book/review_counts.json",
                       params={"key": "fCJUTsj0cvGRJJvRslnvnw", "isbns": isbn})
    return res.json()
