require("dotenv").config();
const express = require("express");
const app = express();
const json = require("body-parser").json();
const { paymentRouter } = require("./routes");
const { connect } = require("./db");

app.use(json);
app.use("/payments", paymentRouter);

app.listen(process.env.PORT, async () => {
  const { db } = await connect();
  db.close();
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
