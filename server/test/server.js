require("dotenv").config();

describe("Server", () => {
  it("Should start the server", () => {
    const { server } = require("../index");
    server.close();
  });
});
