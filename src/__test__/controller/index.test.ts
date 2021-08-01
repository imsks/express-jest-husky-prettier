import supertest from 'supertest';
import app from '../../app';
import { SetCountryData } from '../../interfaces';

const request = supertest(app);

const BASE_API_URL = '/api/v1';

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

    const [{ id, name, startYear, endYear, categories }] = payload as Array<
      SetCountryData
    >;

    expect(typeof id).toBe('number');
    expect(typeof name).toBe('string');
    expect(typeof startYear).toBe('number');
    expect(typeof endYear).toBe('number');
    expect(Array.isArray(categories)).toBe(true);

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

  it('2. Should return no country if parameters are incorrect', async done => {
    const response = await request.get(
      `${BASE_API_URL}/country/${countryName}?startYear=${correctParameters.startYear}&endYear=${correctParameters.endYear}&parameters=${incorrectQueryParameters}`,
    );

    expect(response.statusCode).toEqual(200);

    const { status, count, payload } = response.body;

    expect(status).toEqual(true);
    expect(response.body).toHaveProperty('payload');
    expect(response.body).toHaveProperty('count');

    expect(typeof count).toBe('number');
    expect(typeof payload).toBe('object');

    expect(count).toBe(0);
    expect(payload.length).toEqual(0);

    done();
  });

  it('3. Should return countries with filtered data', async done => {
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
});
