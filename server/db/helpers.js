const mongo = require("mongodb");
const moment = require("moment-timezone");
var MongoClient = mongo.MongoClient;

var url = `mongodb://localhost:27017/${process.env.DB_NAME}`;

async function connect() {
  const db = await MongoClient.connect(url);
  console.log(`connected to db ${url}`);
  return { db, dbo: db.db(process.env.DB_NAME) };
}

function getIdFromTime(time) {
  if (!moment.isMoment(time)) {
    throw Error("time must be a moment");
  }

  let id = Math.floor(time.unix()).toString(16) + "0000000000000000";

  return mongo.ObjectID(id);
}

module.exports = { connect, getIdFromTime };
