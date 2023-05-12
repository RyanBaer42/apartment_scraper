const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "84120Soccer42!!",
    host: "localhost",
    port: 5432,
    database: "apartments"
});

module.exports = pool;