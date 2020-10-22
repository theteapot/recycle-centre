var MongoClient = require("mongodb").MongoClient;
var url = `mongodb://localhost:27017/${process.env.DB_NAME}`;

async function connect() {
  const db = await MongoClient.connect(url);
  console.log(`connected to db ${url}`);
  return { db, dbo: db.db(process.env.DB_NAME) };
}

module.exports = {
  connect,
};
