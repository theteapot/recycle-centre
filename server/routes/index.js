const express = require("express");
var paymentRouter = express.Router();
const stringify = require("csv-stringify");
const { createPayment, getPayments } = require("../db/payments");

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
  stringify(result, (err, output) => res.send(output));
});

module.exports = { paymentRouter };
