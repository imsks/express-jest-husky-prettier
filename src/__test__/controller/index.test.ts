import supertest from 'supertest';
import app from '../../app';
import {
  createTables,
  setCountryWiseDataToTable,
} from '../../database-modules';
import connection from '../../database/DatabaseConfig';
import { SetCountryData } from '../../interfaces';
import { cleanDataFromSource } from '../../utils';

const request = supertest(app);

const BASE_API_URL = '/api/v1';

beforeAll(async () => {
  return connection.serialize(async () => {
    await createTables();
    await cleanDataFromSource();
    setCountryWiseDataToTable();
  });
});

afterAll(() => {
  connection.run('DROP TABLE mytable');
  connection.run('DROP TABLE countrywisedata');
  connection.close();
});

// 1. Get all countries data
describe('Get all countries data', () => {
  it('1. Should get list of all campaigns with descending order of total amount', async done => {
    const response = await request.get(`${BASE_API_URL}/countries`);

    expect(response.statusCode).toEqual(200);

    const { status, count, payload } = response.body;

    expect(status).toEqual(true);
    expect(response.body).toHaveProperty('payload');
    expect(response.body).toHaveProperty('count');

    expect(typeof count).toBe('number');
    expect(typeof payload).toBe('object');

    done();
  });
});

// 2. Query data from JSON file
describe('Query data from JSON file', () => {
  const countryName = 'Australia';

  const incorrectParameters = {
    startYear: 2000,
    endYear: 1995,
  };

  const correctParameters = {
    startYear: 1995,
    endYear: 2014,
  };

  const incorrectQueryParameters = 'abcd, efgh';

  const correctQueryParameters = 'co2,no2';

  it('1. Should return error if startYear is greater than endYear', async done => {
    const response = await request.get(
      `${BASE_API_URL}/country/${countryName}?startYear=${incorrectParameters.startYear}&endYear=${incorrectParameters.endYear}`,
    );

    expect(response.statusCode).toEqual(400);

    const { status, error } = response.body;

    expect(status).toEqual(false);
    expect(response.body).toHaveProperty('error');

    expect(typeof error).toBe('string');

    done();
  });

  it('2. Should return error if parameters are incorrect', async done => {
    const response = await request.get(
      `${BASE_API_URL}/country/${countryName}?startYear=${correctParameters.startYear}&endYear=${correctParameters.endYear}&parameters=${incorrectQueryParameters}`,
    );

    expect(response.statusCode).toEqual(400);

    const { status, error } = response.body;

    expect(status).toEqual(false);
    expect(response.body).toHaveProperty('error');

    expect(typeof error).toBe('string');

    done();
  });

  it('3. Should return error if startYear < 1990', async done => {
    const startYear = 1985;
    const response = await request.get(
      `${BASE_API_URL}/country/${countryName}?startYear=${startYear}&endYear=${correctParameters.endYear}&parameters=${correctQueryParameters}`,
    );

    expect(response.statusCode).toEqual(400);

    const { status, error } = response.body;

    expect(status).toEqual(false);
    expect(response.body).toHaveProperty('error');

    expect(typeof error).toBe('string');

    done();
  });

  it('3. Should return error if endYear > 2014', async done => {
    const endYear = 2020;
    const response = await request.get(
      `${BASE_API_URL}/country/${countryName}?startYear=${correctParameters.startYear}&endYear=${endYear}&parameters=${correctQueryParameters}`,
    );

    expect(response.statusCode).toEqual(400);

    const { status, error } = response.body;

    expect(status).toEqual(false);
    expect(response.body).toHaveProperty('error');

    expect(typeof error).toBe('string');

    done();
  });

  it('4. Should return countries with filtered data', async done => {
    const response = await request.get(
      `${BASE_API_URL}/country/${countryName}?startYear=${correctParameters.startYear}&endYear=${correctParameters.endYear}&parameters=${correctQueryParameters}`,
    );

    expect(response.statusCode).toEqual(200);

    const { status, count, payload } = response.body;

    expect(status).toEqual(true);
    expect(response.body).toHaveProperty('payload');
    expect(response.body).toHaveProperty('count');

    expect(typeof count).toBe('number');
    expect(typeof payload).toBe('object');

    expect(count > 0).toBe(true);
    expect(payload.length > 0).toEqual(true);

    done();
  });

  it('5. Should return countries with filtered data => Only startYear provided', async done => {
    const response = await request.get(
      `${BASE_API_URL}/country/${countryName}?startYear=${correctParameters.startYear}`,
    );

    expect(response.statusCode).toEqual(200);

    const { status, count, payload } = response.body;

    expect(status).toEqual(true);
    expect(response.body).toHaveProperty('payload');
    expect(response.body).toHaveProperty('count');

    expect(typeof count).toBe('number');
    expect(typeof payload).toBe('object');

    expect(count > 0).toBe(true);
    expect(payload.length > 0).toEqual(true);

    done();
  });

  it('6. Should return countries with filtered data => Only endYear provided', async done => {
    const response = await request.get(
      `${BASE_API_URL}/country/${countryName}?endYear=${correctParameters.endYear}`,
    );

    expect(response.statusCode).toEqual(200);

    const { status, count, payload } = response.body;

    expect(status).toEqual(true);
    expect(response.body).toHaveProperty('payload');
    expect(response.body).toHaveProperty('count');

    expect(typeof count).toBe('number');
    expect(typeof payload).toBe('object');

    expect(count > 0).toBe(true);
    expect(payload.length > 0).toEqual(true);

    done();
  });

  it('7. Should return countries with filtered data => Only parameters provided', async done => {
    const response = await request.get(
      `${BASE_API_URL}/country/${countryName}?parameters=${correctQueryParameters}`,
    );

    expect(response.statusCode).toEqual(200);

    const { status, count, payload } = response.body;

    expect(status).toEqual(true);
    expect(response.body).toHaveProperty('payload');
    expect(response.body).toHaveProperty('count');

    expect(typeof count).toBe('number');
    expect(typeof payload).toBe('object');

    expect(count > 0).toBe(true);
    expect(payload.length > 0).toEqual(true);

    done();
  });
});
