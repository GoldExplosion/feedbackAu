const Pool= require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password:"Jivi1122",
    host:"localhost",
    port:5432,
    database: "testdb"
})

module.exports= pool