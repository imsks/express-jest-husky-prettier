import app from './app';
import configEnv from './config';
import connection from './database/DatabaseConfig';
import {
  cleanDataFromSource,
  createTable,
  setCleanedDataToJson,
} from './utils';

const PORT = configEnv.PORT || 8000;

connection.connect(error => {
  if (error) throw error;

  console.log('MySQL Connected!');

  // 1. Creates table if not created
  createTable();

  // 2. Parses data from CSV and put into database table => ONE TIME ONLY
  // cleanDataFromSource();

  // 3. Saves cleaned data into JSON file
  setCleanedDataToJson();
});

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
