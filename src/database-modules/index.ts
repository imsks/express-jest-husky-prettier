import * as fs from 'fs';
import path from 'path';
import connection from '../database/DatabaseConfig';
import { GetCountryData, SetCountryData } from '../interfaces';

export const createDatabase = (): void => {
  connection.run(
    `CREATE DATABASE IF NOT EXISTS blue_sky_analytics_assignment;`,
    error => {
      if (error) throw error;
      console.log('Database created');
    },
  );
};

export const createTable = (): void => {
  connection.run(
    `CREATE TABLE IF NOT EXISTS mytable(
        id INTEGER NOT NULL PRIMARY KEY,
        name VARCHAR(24) NOT NULL,
        year INTEGER  NOT NULL,
        value VARCHAR(16) NOT NULL,
        category VARCHAR(110) NOT NULL
     )`,
  );
  console.log('2. Table created');
};

export const setSourceDataToJSON = (): void => {
  connection.run(
    'SELECT id, name, year, value, category FROM mytable',
    (error, result) => {
      // console.log(result);
      // Write teh JSON with cleaned up data
      fs.writeFile(
        path.resolve(__dirname, '../assets', 'sourceData.json'),
        JSON.stringify({ result }),
        error => {
          if (error) throw error;
        },
      );
    },
  );

  console.log('Source data set');
};

export const setCleanedDataToJson = (): void => {
  connection.run(
    'SELECT id, name, year, category FROM mytable',
    (error, result: Array<GetCountryData>) => {
      if (error) throw error;

      const output: Array<SetCountryData> = [];

      let index = 1;

      // Loop over all rows on
      result.forEach((item: GetCountryData) => {
        // Take the name for iteration
        const { name } = item;

        // Get all rows for a country
        const countryDataByName = result
          .filter(data => {
            return data.name == name;
          })
          .map(countryData => {
            const { id, name, year, category } = countryData;

            const isCO2Exists = category.includes('co2');
            const isNO2Exists = category.includes('no2');

            const categories: Array<string> = [];

            if (isCO2Exists) categories.push('co2');
            if (isNO2Exists) categories.push('no2');

            // Filter out required data
            return { id, name, year, categories };
          });

        // First element as endYear
        const firstElementInCountryList = countryDataByName[0];

        // Last element as endYear
        const lastElementInCountryList =
          countryDataByName[countryDataByName.length - 1];

        // If country doesn't exist => Push to output
        if (!output.find(countryData => countryData.name === name)) {
          output.push({
            id: index,
            name,
            startYear: lastElementInCountryList.year,
            endYear: firstElementInCountryList.year,
            categories: firstElementInCountryList.categories,
          });

          // Write teh JSON with cleaned up data
          fs.writeFile(
            path.resolve(__dirname, '../assets', 'cleanData.json'),
            JSON.stringify({ result: output }),
            error => {
              if (error) throw error;
            },
          );

          index = index + 1;
        }
      });
    },
  );
};
