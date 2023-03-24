// 'config' is the config from app.json
export default ({ config }) => {
  // DEV env for local work, otherwise use prod server
  if (process.env.APP_ENV == "DEV") {
    config = {
      ...config,
      extra: {
        SERVER: "http://192.168.11.101:5142",
      },
    };
  } else {
    config = {
      ...config,
      extra: {
        SERVER:
          "http://ec2-13-55-100-110.ap-southeast-2.compute.amazonaws.com:8888",
      },
    };
  }
  return config;
};
