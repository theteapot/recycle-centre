const { connect } = require("./index");
const moment = require("moment-timezone");

async function createPayment(body) {
  const { db, dbo } = await connect();
  const collection = dbo.collection("payments");

  let result = await collection.insertOne({
    ...body,
    timestamp: moment.tz(new moment(), process.env.TZ).toString(),
  });

  db.close();
  return result;
}

async function getPayments() {
  const { db, dbo } = await connect();
  const collection = dbo.collection("payments");
  let result = await (await collection.aggregate([])).toArray();
  result = result.map((record) => ({
    ...record,
    timestamp: new moment(record.timestamp._d)
      .tz("Pacific/Auckland")
      .toString(),
  }));
  db.close();
  return result;
}

async function getOrders() {
  const { db, dbo } = await connect();
  const collection = dbo.collection("orders");
  let result = await (await collection.aggregate([])).toArray();
  result = result.map((record) => ({
    ...record,
    total: record.paymentAmount * record.productQuantity,
    timestamp: new moment(record.timestamp._d)
      .tz("Pacific/Auckland")
      .toString(),
  }));
  db.close();
  return result;
}

async function createOrder({ order }) {
  const { db, dbo } = await connect();
  const collection = dbo.collection("orders");
  let result = [];
  console.log(order);
  for (const line of order) {
    result.push(
      await collection.insertOne({
        ...line,
        timestamp: moment.tz(new moment(), process.env.TZ).toString(),
      })
    );
  }
  console.log(result);
  db.close();
  return result;
}

module.exports = { createPayment, getPayments, createOrder, getOrders };
