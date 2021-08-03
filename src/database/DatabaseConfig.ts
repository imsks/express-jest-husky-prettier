// import mysql from 'mysql';
// import configEnv from '../config';
import sqlite3 from 'sqlite3';

const connection = new (sqlite3.verbose().Database)(':memory:');

console.log('1. Connected to the in-memory SQlite database.');

// const connection = mysql.createConnection({
//   host: configEnv.PORT,
//   user: configEnv.MYSQL_USER,
//   password: configEnv.MYSQL_PASSWORD,
//   database: configEnv.MYSQL_DATABASE,
// });

export default connection;
