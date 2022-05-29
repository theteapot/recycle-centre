require("dotenv").config();
const db = require("../db");
const assert = require("assert");

describe("Database", () => {
  describe("connect", () => {
    it("Should connect successfully", async () => {
      let result = await db.helpers.connect();
      console.log(result.db.s.url);
      assert.equal(
        result.db.s.url,
        `mongodb://localhost:27017/${process.env.DB_NAME}`,
        "Should have a url for connection"
      );
    });
  });
});
