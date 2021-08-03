import app from './app';
import configEnv from './config';
import {
  createTables,
  setCountryWiseDataToTable,
  // setSourceDataToJSON,
} from './database-modules';
import connection from './database/DatabaseConfig';
import { cleanDataFromSource } from './utils';

connection.serialize(async () => {
  await createTables();
  await cleanDataFromSource();
  setCountryWiseDataToTable();
});

const PORT = configEnv.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
