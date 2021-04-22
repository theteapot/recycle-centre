require("dotenv").config();
const express = require("express");
const json = require("body-parser").json();
const { paymentRouter, historyRouter } = require("./routes");
const { helpers } = require("./db");
const morgan = require("morgan");

const app = express();

app.use(json);
app.use(morgan("tiny"));
app.use("/payments", paymentRouter);
app.use("/history", historyRouter);

app.listen(process.env.PORT, async () => {
  const { db } = await helpers.connect();
  db.close();
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
