const { connect, getIdFromTime } = require("./helpers");
const moment = require("moment-timezone");

async function getOrders() {
  let endId = getIdFromTime(new moment());
  let startId = getIdFromTime(new moment().days(-1));

  const { db, dbo } = await connect();
  const collection = dbo.collection("payments");

  console.log(startId, endId);

  let result = await (
    await collection.find({ _id: { $gte: startId, $lte: endId } })
  ).toArray();
  result = result.map((record) => ({
    ...record,
    timestamp: new moment(record._id.getTimestamp())
      .tz("Pacific/Auckland")
      .toString(),
  }));
  db.close();
  return result;
}

module.exports = { getOrders };
