const express = require("express");
var paymentRouter = express.Router();
const stringify = require("csv-stringify");
const {
  createPayment,
  getPayments,
  createOrder,
  getOrders,
} = require("../db/payments");

paymentRouter.post("/", async (req, res, next) => {
  let result = await createPayment(req.body);
  res.json(result);
});

paymentRouter.get("/", async (req, res, next) => {
  let result = await getPayments();
  res.json(result);
});

paymentRouter.get("/csv", async (req, res, next) => {
  res.set({ "Content-Disposition": 'attachment; filename="payments.csv"' });
  let result = await getPayments();
  stringify(
    result,
    {
      columns: [
        "timestamp",
        "productType",
        "paymentType",
        "paymentAmount",
        "comment",
      ],
    },
    (err, output) => res.send(output)
  );
});

paymentRouter.get("/shop-csv", async (req, res, next) => {
  res.set({ "Content-Disposition": 'attachment; filename="orders.csv"' });
  let result = await getOrders();
  stringify(
    result,
    {
      columns: [
        "timestamp",
        "label",
        "value",
        "paymentAmount",
        "productQuantity",
      ],
    },
    (err, output) => res.send(output)
  );
});

paymentRouter.post("/shop", async (req, res, next) => {
  console.log("got /shop request");
  let result = await createOrder(req.body);
  res.json(result);
});

module.exports = { paymentRouter };
