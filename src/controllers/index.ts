import { Request, Response } from 'express';
import * as fs from 'fs';
import path from 'path';
import connection from '../database/DatabaseConfig';
import { GetCompanyData, SetCompanyData } from '../interfaces';

// 1. Get all countries data
export const getAllCountries = async (
  request: Request,
  response: Response,
): Promise<void> => {
  // connection.query('SELECT id, name, year, category FROM mytable', function(
  //   err,
  //   result: Array<GetCompanyData>,
  // ) {
  //   if (err) throw err;
  //   const output: Array<SetCompanyData> = [];
  //   let index = 1;
  //   result.forEach(function(item: GetCompanyData) {
  //     const { name } = item;
  //     const countryDataByName = result
  //       .filter(data => {
  //         return data.name == name;
  //       })
  //       .map(countryData => {
  //         const { id, name, year, category } = countryData;
  //         const isCO2Exists = category.includes('co2');
  //         const isNO2Exists = category.includes('no2');
  //         const categories = [];
  //         if (isCO2Exists) categories.push('co2');
  //         if (isNO2Exists) categories.push('no2');
  //         return { id, name, year, categories };
  //       });
  //     const firstElementInCountryList = countryDataByName[0];
  //     const lastElementInCountryList =
  //       countryDataByName[countryDataByName.length - 1];
  //     if (!output.find(countryData => countryData.name === name)) {
  //       output.push({
  //         id: index,
  //         name,
  //         startYear: lastElementInCountryList.year,
  //         endYear: firstElementInCountryList.year,
  //         categories: firstElementInCountryList.categories,
  //       });
  //       index = index + 1;
  //     }
  //   });
  //   fs.writeFile(
  //     path.resolve(__dirname, '../assets', 'realData.json'),
  //     JSON.stringify({ result: output }),
  //     error => {
  //       console.log(error);
  //     },
  //   );
  //   response.status(200).json({
  //     output,
  //   });
  // });
};
