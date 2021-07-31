import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import connection from '../database/DatabaseConfig';
import { UserCsvRow, UserDetailsRow } from '../interfaces';

export const cleanData = (): void => {
  const result: Array<UserDetailsRow> = [];
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
      csv.format<UserCsvRow, UserDetailsRow>({ headers: true }),
    )

    // Using the transform function from the formatting stream
    .transform((row: UserCsvRow): void => {
      //   const country = row.country_or_area;

      //   const years: Array<number> = [];

      //   years.push(row.year);

      //   console.log(row);
      const rowData = {
        id: count,
        name: row.country_or_area,
        year: row.year,
        value: row.value,
        category: row.category,
      } as UserDetailsRow;

      connection.query(
        `INSERT INTO mytable(id, name,year,value,category) VALUES (${rowData.id},'${rowData.name}',${rowData.year},${rowData.value},'${rowData.category}')`,
        function(err) {
          if (err) throw err;
        },
      );

      count = count + 1;
    });
};
