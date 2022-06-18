const express = require("express");
var productRouter = express.Router();
const { products } = require("../db");
const recycleProducts = require("../data/recycleProducts.json");
const shopProducts = require("../data/shopProducts.json");

productRouter.get("/recycling", async (req, res, next) => {
  res.json(recycleProducts);
});

productRouter.get("/shop", async (req, res, next) => {
  res.json(shopProducts);
});

module.exports = productRouter;
