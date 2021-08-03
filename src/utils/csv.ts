import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import connection from '../database/DatabaseConfig';
import { SourceCSVRowNames, CleanedRowNames } from '../interfaces';

export const cleanDataFromSource = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    let count = 1;

    fs.createReadStream(
      path.resolve(
        __dirname,
        '../assets',
        'greenhouse_gas_inventory_data_data.csv',
      ),
    )
      .pipe(csv.parse({ headers: true }))
      // pipe the parsed input into a csv formatter
      .pipe(
        csv.format<SourceCSVRowNames, CleanedRowNames>({ headers: true }),
      )

      // Using the transform function from the formatting stream
      .transform((row: SourceCSVRowNames): void => {
        const rowData = {
          id: count,
          name: row.country_or_area,
          year: row.year,
          value: row.value,
          category: row.category,
        } as CleanedRowNames;

        connection.run(
          `INSERT INTO mytable(id, name,year,value,category) VALUES (${rowData.id},'${rowData.name}',${rowData.year},${rowData.value},'${rowData.category}')`,
          (error: Error) => {
            if (error) {
              console.log(error);
            }

            resolve();
          },
        );

        count = count + 1;
      });

    console.log('3. Cleaned data from source');
  });
};
