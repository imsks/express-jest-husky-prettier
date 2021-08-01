import mysql from 'mysql';
import configEnv from '../config';

const connection = mysql.createConnection({
  host: configEnv.PORT,
  user: configEnv.MYSQL_USER,
  password: configEnv.MYSQL_PASSWORD,
  database: configEnv.MYSQL_DATABASE,
});

export default connection;
