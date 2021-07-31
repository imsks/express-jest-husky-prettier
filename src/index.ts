import app from './app';
import configEnv from './config';
import connection from './database/DatabaseConfig';
import { cleanData } from './utils/csv';
import { createTable } from './utils/database';

const PORT = configEnv.PORT || 8000;

connection.connect(error => {
  if (error) throw error;
  console.log('MySQL Connected!');

  // createTable();

  // cleanData();
});

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
