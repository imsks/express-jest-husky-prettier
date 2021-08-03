import app from './app';
import configEnv from './config';
import {
  createTables,
  setCountryWiseDataToTable,
  // setSourceDataToJSON,
} from './database-modules';
import connection from './database/DatabaseConfig';
import { cleanDataFromSource } from './utils';

connection.serialize(() => {
  // 1. Creates table if not created
  createTables();

  // 2. Parses data from CSV and put into database table => ONE TIME ONLY
  cleanDataFromSource().then(() => {
    // 3. Get whole source data in structured format in JSON file
    setCountryWiseDataToTable();
  });
});

const PORT = configEnv.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
