require("dotenv").config();
const db = require('better-sqlite3')("emplsDataBase.db");

module.exports= db;