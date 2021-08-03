import { Request, Response } from 'express';
import {
  getCleanedSourceData,
  getSourceDataFromTable,
} from '../database-modules';
import { CleanedRowNames } from '../interfaces';

// 1. Get all countries data
export const getAllCountries = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const cleanData = await getCleanedSourceData();

  response.status(200).json({
    status: true,
    count: cleanData.length,
    payload: cleanData,
  });
};

// 2. Query data from JSON file
export const queryDataFromJSONFile = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { name } = request.params;
  const startYear = request.query.startYear as string;
  const endYear = request.query.endYear as string;
  const parameters = request.query.parameters?.toString().split(',') as Array<
    string
  >;
  // If startYear < 1990 or endYear > 2014, return error
  if (parseInt(startYear) < 1990 || parseInt(endYear) > 2014) {
    response.status(400).json({
      status: false,
      error: 'No data found. Please check you filters',
    });
    return;
  }
  // if startYear > endYear, return error
  if (parseInt(startYear) > parseInt(endYear)) {
    response.status(400).json({
      status: false,
      error: "endYear can't be greater than startYear",
    });
    return;
  }

  const sourceData = await getSourceDataFromTable();

  let listByCountryName = sourceData.filter(
    (countryData: CleanedRowNames) => countryData.name === name,
  );
  // If startYear provided
  if (startYear) {
    listByCountryName = listByCountryName.filter(
      countryData => countryData.year >= parseInt(startYear),
    );
  }
  // If endYear provided
  if (endYear) {
    listByCountryName = listByCountryName.filter(
      countryData => countryData.year <= parseInt(endYear),
    );
  }
  // If parameters provided
  if (parameters) {
    listByCountryName = listByCountryName.filter(countryData => {
      return parameters.every(parameter => {
        return countryData.category.includes(parameter);
      });
    });
  }
  // If listByCountryName.length === 0, return error
  if (listByCountryName.length === 0) {
    response.status(400).json({
      status: false,
      error: 'No data found. Please check you filters',
    });
    return;
  }
  response.status(200).json({
    status: true,
    count: listByCountryName.length,
    payload: listByCountryName,
  });
};
