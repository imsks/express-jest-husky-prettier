import app from './app';
import configEnv from './config';
import connection from './database/DatabaseConfig';
import {
  createTable,
  setCleanedDataToJson,
  createDatabase,
  cleanDataFromSource,
  setSourceDataToJSON,
} from './utils';

const PORT = configEnv.PORT || 8000;

// // In production we won't need this as we'll already have the cleaned data it JSON
// connection.connect(error => {
//   if (error) throw error;

//   console.log('MySQL Connected!');

//   // 1. Creates database if not created
//   createDatabase();

//   // 2. Creates table if not created
//   createTable();

//   // 3. Parses data from CSV and put into database table => ONE TIME ONLY
//   // cleanDataFromSource();

//   // 4. Get whole source data in stuctured format in JSON file
//   setSourceDataToJSON();

//   // 5. Saves cleaned data into JSON file
//   setCleanedDataToJson();
// });

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
