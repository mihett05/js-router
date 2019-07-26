from flask import Flask, send_file

app = Flask(__name__)


@app.route("/api/")
def api():
    return "<h1>api</h1>"


@app.route("/router.js")
def script():
    return send_file("router.js")


@app.route("/style.css")
def style():
    return send_file("style.css")


@app.errorhandler(404)
def index(err):
    return send_file("index.html")


app.run("localhost", 3000, True)
