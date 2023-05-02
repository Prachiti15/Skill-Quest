require("dotenv").config();
const mongoClient = require("mongodb").MongoClient;
const mongoDbUrl = process.env.MONGO_URI;
let mongodb;

function connect(callback) {
  mongoClient.connect(mongoDbUrl, (err, db) => {
    mongodb = db.db("eLitmus");
    callback();
  });
}

function get() {
  return mongodb;
}
function close() {
  mongodb.close();
}

module.exports = {
  connect,
  get,
  close,
};
