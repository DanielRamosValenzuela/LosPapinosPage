const dbconfig = {
  user: "logpapino",
  password: "logpapino123",
  server: "localhost", //localhost //131.72.237.194
  database: "papinos",
  //  authentication: {
  //      type: 'default',
  //     options: {
  //         userName: process.env.AUTH_LOCAL_USR,
  //         password: process.env.AUTH_LOCAL_PWD,
  //     },
  // },

  options: {
    enableArithAbort: true,
    encrypt: false,
  },
};
module.exports = dbconfig;
