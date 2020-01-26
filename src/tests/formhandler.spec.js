import 'regenerator-runtime/runtime';
import { handleSubmit } from '../client/js/formHandler'


describe('Test to make sure function exists' , () => {
    test('It should return true', async () => {
        expect(handleSubmit).toBeDefined();
    });
});
describe('Test, the function "handleSubmit()" should be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof handleSubmit).toBe("function");
    });
});
