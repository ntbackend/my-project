require("dotenv").config();

const { env } = process

const config = {
  port: env.PORT,
  mongoUri: process.env.MONGOURI,
  session: {
    secret: env.SESSION_SECRET,
    duration: +env.SESSION_DURATION,
  },
};

module.exports = config;