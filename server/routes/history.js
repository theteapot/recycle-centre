const express = require("express");
var historyRouter = express.Router();
const stringify = require("csv-stringify");
const { history } = require("../db");

historyRouter.get("/", async (req, res, next) => {
  let result = await history.getOrders();
  res.json(result);
});

module.exports = historyRouter;
