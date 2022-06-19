require("dotenv").config();
const db = require("../db");
const assert = require("assert");

describe("Database", () => {
  describe("Connect to local MongoDB", () => {
    it("Should connect successfully", async () => {
      let result = await db.helpers.connect();
      console.log(result.db.s.url);
      assert.equal(
        result.db.s.url,
        `mongodb://localhost:27017/recycle_centre`,
        "Should have a url for connection"
      );
      result.db.close();
    });
  });
});
