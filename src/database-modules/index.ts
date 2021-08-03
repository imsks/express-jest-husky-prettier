import connection from '../database/DatabaseConfig';
import { CleanedRowNames, GetCountryData, SetCountryData } from '../interfaces';

export const createTables = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    connection.run(
      `CREATE TABLE IF NOT EXISTS mytable(
          id INTEGER NOT NULL PRIMARY KEY,
          name VARCHAR(24) NOT NULL,
          year INTEGER  NOT NULL,
          value VARCHAR(16) NOT NULL,
          category VARCHAR(110) NOT NULL
       )`,
    );

    connection.run(
      `CREATE TABLE IF NOT EXISTS countrywisedata(
          id INTEGER NOT NULL PRIMARY KEY,
          name VARCHAR(24) NOT NULL,
          startYear INTEGER  NOT NULL,
          endYear INTEGER  NOT NULL,
          categories VARCHAR(110) NOT NULL
       )`,
    );

    console.log('2. Table created');

    resolve();
  });
};

export const setCountryWiseDataToTable = (): void => {
  connection.all(
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

          const startYear = lastElementInCountryList.year;
          const endYear = firstElementInCountryList.year;
          const categories = firstElementInCountryList.categories.toString();

          connection.run(
            `INSERT INTO countrywisedata(id, name, startYear, endYear, categories) VALUES (${index},'${name}',${startYear},${endYear},'${categories}')`,
            (error: Error) => {
              if (error) throw error;
            },
          );

          index = index + 1;
        }
      });
    },
  );

  console.log('4. CountryWiseData table created');
};

export const getCleanedSourceData = (): Promise<Array<SetCountryData>> => {
  return new Promise((resolve, reject) => {
    connection.all(
      'SELECT * FROM countrywisedata',
      (error, result: Array<SetCountryData>) => {
        if (error) reject(error);

        resolve(result);
      },
    );
  });
};

export const getSourceDataFromTable = (): Promise<Array<CleanedRowNames>> => {
  return new Promise((resolve, reject) => {
    connection.all(
      'SELECT * FROM mytable',
      (error, result: Array<CleanedRowNames>) => {
        if (error) reject(error);

        resolve(result);
      },
    );
  });
};
