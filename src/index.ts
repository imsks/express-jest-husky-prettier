import app from './app';
import configEnv from './config';
import {
  createTable,
  setCountryWiseDataToTable,
  // setSourceDataToJSON,
} from './database-modules';
import connection from './database/DatabaseConfig';
import { cleanDataFromSource } from './utils';

connection.serialize(() => {
  // 1. Creates table if not created
  createTable();

  // 2. Parses data from CSV and put into database table => ONE TIME ONLY
  cleanDataFromSource().then(() => {
    // 3. Get whole source data in structured format in JSON file
    setCountryWiseDataToTable();
  });
});

// connection.close();

const PORT = configEnv.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
