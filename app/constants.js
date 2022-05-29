import Constants from "expo-constants";

// let SERVER =
//   "http://ec2-13-55-100-110.ap-southeast-2.compute.amazonaws.com:8888";
// console.log(process.env);
// if (process.env.APP_ENV === "DEV") {
//   console.log("DEV build");
//   SERVER = "http://192.168.88.250:8888";
// } else {
//   SERVER = "http://ec2-13-55-100-110.ap-southeast-2.compute.amazonaws.com:8888";
// }
export const SERVER = Constants.manifest.extra.SERVER;
