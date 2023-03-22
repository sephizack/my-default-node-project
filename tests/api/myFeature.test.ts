import nock from 'nock'
import supertest from 'supertest'
import app from '../../src/app.js'
import DataStorage from '../../src/modules/data_storage.js'

beforeAll(() => {
});

beforeEach(() => {
    nock.cleanAll()
    jest.restoreAllMocks()
});

afterEach(() => {

});

afterAll(() => {
});

function expectEqualWithLog(status:any, expected:any, logIfFailed?:any) {
    if (expected !== status) {
        console.warn("HTTP status check failed", logIfFailed)
    }
    expect(status).toBe(expected);
}

test('Feature: getStoredData ', async () => {
    jest.spyOn(DataStorage, 'accessServerData').mockImplementation(() => { 
        return {"key1": 12345, "key2": "bla"}
      })
    let apiResponse = await supertest(app).get('/api/v1/my-feature/getStoredData');

    expectEqualWithLog(apiResponse.status, 200, apiResponse.body);
    expect(apiResponse.body).toMatchObject({
        "message": "Here is server data",
        "my_data": {"key1": 12345, "key2": "bla"},
        "status": "OK"
    })
});

test('Feature: callWithRegexpCheck OK', async () => {
    let apiResponse = await supertest(app).get('/api/v1/my-feature/callWithRegexpCheck?data=COUCOU1234BLA');

    expectEqualWithLog(apiResponse.status, 200, apiResponse.body);
    expect(apiResponse.body).toMatchObject({
        "message": "Your data is matching regexp"
    })
});

test('Feature: callWithRegexpCheck KO', async () => {
    let apiResponse = await supertest(app).get('/api/v1/my-feature/callWithRegexpCheck?data=COUOU1234BLA');

    expectEqualWithLog(apiResponse.status, 200, apiResponse.body);
    expect(apiResponse.body).toMatchObject({
        "message": "Your data is matching regexp"
    })
});
