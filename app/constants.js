let SERVER;

if (process.env.ENV === "DEV") {
  console.log("DEV build");
  SERVER = "http://192.168.1.126:8888";
} else {
  SERVER = "http://ec2-13-55-100-110.ap-southeast-2.compute.amazonaws.com:8888";
}

export { SERVER };
