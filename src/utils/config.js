require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const dbURL = process.env.DB_URL;

module.exports = {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    NODE_ENV,
    PORT,
    dbURL,
};