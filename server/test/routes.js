require("dotenv").config();
const routes = require("../routes");
const assert = require("assert");
const fetch = require("node-fetch");
const parse = require('csv-parse');
const stream = require('node:stream');
const util = require('node:util')
const fs = require('node:fs')

describe("Routes", () => {
  let server;
  before(() => (server = require("../index")));
  after(() => server.server.close());

  describe("Payment Router", () => {

    it("Should create a payment", async () => {
      const payment = {
        paymentType: "EFTPOS",
        paymentAmount: "4",
        productType: "PLASTIC MIXED",
        comment: "comment",
      }
      let result = await (
        await fetch("http://localhost:5142/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payment),
        })
      ).json();
      assert.ok(result.insertedCount == 1, "Should insert one record");
      // Check that all properties are returned
      Object.keys(payment).map((property) => {
        assert.ok(result.ops[0].hasOwnProperty(property), `Should have ${property}`)
      })
    });

    it("Should get payments", async () => {
      let result = await (
        await fetch("http://localhost:5142/payments", {
          method: "GET",
        })
      ).json();
      assert.ok(result.length > 0, "Should return more than one record");
    });

    it("Should get payments as a CSV", async () => {

      let response = await fetch("http://localhost:5142/payments/csv", {
        method: "GET",
      })

      let csv = "";

      try {
        for await (const chunk of response.body) {
          csv = csv + chunk.toString()
        }
      } catch (err) {
        console.error(err.stack)
      }

      let x = await parse.parse(csv)
      console.log(x)

      console.log(csv)

    })
  });
});