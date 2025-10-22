require("dotenv").config();

const config = Object.freeze({
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    accessTokenSecret: process.env.JWT_SECRET || "your-super-secret-jwt-key-for-development",
});

module.exports = config;
