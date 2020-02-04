import 'regenerator-runtime/runtime';
import { addTrip, rmvTrip, retrieve } from '../client/js/trips.js'


describe('Test to make sure addTrip function exists' , () => {
    test('It should return true', async () => {
        expect(addTrip).toBeDefined()
    });
});
describe('Test to make sure rmvTrip function exists' , () => {
    test('It should return true', async () => {
        expect(rmvTrip).toBeDefined()
    });
});
describe('Test to make sure retrieve function exists' , () => {
    test('It should return true', async () => {
        expect(retrieve).toBeDefined()
    });
});
