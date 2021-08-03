import {
  createTables,
  getCleanedSourceData,
  getSourceDataFromTable,
  setCountryWiseDataToTable,
} from '../../database-modules';
import connection from '../../database/DatabaseConfig';
import { cleanDataFromSource } from '../../utils';

beforeAll(async () => {
  connection.serialize(async () => {
    await createTables();
    setCountryWiseDataToTable();
  });
});

afterAll(() => {
  connection.run('DROP TABLE mytable');
  connection.run('DROP TABLE countrywisedata');
  connection.close();
});

describe('Create tables', () => {
  it('1. Create tables', async done => {
    const response = await createTables();

    expect(typeof response).toBe('undefined');

    done();
  });
});

describe('Clean data from source', () => {
  it('1. Clean data from source', async done => {
    const response = await cleanDataFromSource();

    expect(typeof response).toBe('undefined');

    done();
  });
});

describe('Get cleaned countries data', () => {
  it('1. Get cleaned countries data', async done => {
    const response = await getCleanedSourceData();

    expect(typeof response).toBe('object');

    done();
  });
});

describe('Get source dara from table', () => {
  it('1. Get source dara from table', async done => {
    const response = await getSourceDataFromTable();

    expect(typeof response).toBe('object');

    done();
  });
});
