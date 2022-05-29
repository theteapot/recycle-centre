require("dotenv").config();
const routes = require("../routes");
const assert = require("assert");
const fetch = require("node-fetch");

describe("Routes", () => {
  describe("Payment Router", () => {
    before(() => require("../index"));
    it("Should create a payment", async () => {
      let result = await (
        await fetch("http://localhost:5142/payments", {
          method: "POST",
          body: JSON.stringify({
            paymentType: "EFTPOS",
            paymentAmount: "4",
            productType: "PLASTIC MIXED",
            comment: "comment",
          }),
        })
      ).json();
      assert.ok(result.insertedCount == 1, "Should insert one record");
    });
  });
});
