import connection from '../database/DatabaseConfig';

export const createTable = (): void => {
  connection.query(
    `CREATE TABLE IF NOT EXISTS mytable(
        id INTEGER NOT NULL PRIMARY KEY,
        name VARCHAR(24) NOT NULL,
        year INTEGER  NOT NULL,
        value VARCHAR(16) NOT NULL,
        category VARCHAR(110) NOT NULL
     )`,
    function(err, result) {
      if (err) throw err;
      console.log('Table created');
    },
  );
};
