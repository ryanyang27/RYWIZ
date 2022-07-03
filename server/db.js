const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "RYWIZ",
    host: "localhost",
    port: 5432,
    database: "rywiz"
});

module.exports = pool;
