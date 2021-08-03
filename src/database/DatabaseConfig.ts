import sqlite3 from 'sqlite3';

const connection = new (sqlite3.verbose().Database)(':memory:');

console.log('1. Connected to the in-memory SQlite database.');

export default connection;
