import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sachinoo7',
  database: 'import-test',
});

export default connection;
