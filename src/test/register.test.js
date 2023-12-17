import { registerUser } from '../js/api/auth/register.js';
import * as api from '../js/api/auth/api.js'

describe('registerUser function', () => {

  // Case 1: Testing successful registration
  test('should successfully register a user', async () => {
    const name = 'testuser9';
    const email = 'nine@stud.noroff.no';
    const password = 'TestPassword9';
    const avatar = 'avatar-url.png';

    const expectedResponse = { success: true };

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(expectedResponse),
        ok: true,
      })
    );

    const response = await registerUser(name, email, password, avatar);

    expect(response).toEqual(expectedResponse);

    global.fetch.mockRestore();
  });

  // Case 2: Testing error handling for registration
  test('should throw an error on registration failure', async () => {
    const name = 'testuser9';
    const email = 'nine@stud.noroff.no';
    const password = 'TestPassword9';
    const avatar = 'avatar-url.png';

    const expectedError = 'Failed to register user';
  
    jest.spyOn(api, 'authenticatedRequest').mockRejectedValue(new Error('Failed to fetch data.'));

    await expect(registerUser(name, email, password, avatar)).rejects.toThrowError(expectedError);
  });
});