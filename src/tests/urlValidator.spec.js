import 'regenerator-runtime/runtime';
import { validateURL } from '../client/js/urlValidator'

const url = 'https://www.freecodecamp.org/news/what-programming-language-should-i-learn-first-19a33b0a467d/'

describe('Test to validate URLs' , () => {
    test('It should return true', async () => {
        expect(validateURL(url)).toBe(true);
    });
});
