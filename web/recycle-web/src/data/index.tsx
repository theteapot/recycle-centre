const SERVER_URL = "http://localhost:8888";

function getData() {
  fetch(`${SERVER_URL}`);
}

export default { getData };
