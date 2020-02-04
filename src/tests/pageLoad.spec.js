import 'regenerator-runtime/runtime';
import { pageLoad } from '../client/js/pageLoad.js'


describe('Test to make sure pageLoad is defined as a function' , () => {
    test('It should return function', async () => {
        expect(typeof pageLoad).toBe("function")
    });
});
