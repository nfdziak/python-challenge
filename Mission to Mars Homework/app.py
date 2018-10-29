from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_data"
mongo = PyMongo(app)
# mongo = pymongo(app, uri="mongodb://localhost:27017/mars_app")
# app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
# mongo = pymongo(app)

#  client = pymongo.MongoClient("localhost", 27017)

@app.route("/")
def index():
   mars_data = mongo.db.mars_data.find_one()
   return render_template("index.html", mars_data=mars_data) 


@app.route("/scrape")
def scrape():
   
    mars = mongo.db.mars_data
    mars_data = scrape_mars.scrape()
    mars.update({}, mars_data, upsert=True)
    return redirect("/", code=302)

if __name__ == "__main__":
        app.run(debug=True)