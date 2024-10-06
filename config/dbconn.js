const { Pool } = require('pg');
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'MovieTicketBooking',
password: 'devi',
port: 5435,
});
module.exports = pool;