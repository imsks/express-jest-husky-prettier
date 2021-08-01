import { Request, Response } from 'express';
import { CleanedRowNames } from '../interfaces';
import CleanData from '../assets/cleanData.json';
import SourceData from '../assets/sourceData.json';

// 1. Get all countries data
export const getAllCountries = async (
  request: Request,
  response: Response,
): Promise<void> => {
  response.status(200).json({
    status: true,
    count: CleanData.result.length,
    payload: CleanData.result,
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

  if (parseInt(startYear) > parseInt(endYear)) {
    response.status(400).json({
      status: false,
      error: "endYear can't be greater than startYear",
    });
    return;
  }

  let listByCountryName = SourceData.result.filter(
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

  response.status(200).json({
    status: true,
    count: listByCountryName.length,
    payload: listByCountryName,
  });
};
