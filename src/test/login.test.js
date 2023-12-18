import { loginUser } from '../js/api/auth/login.js';
import 'jest-localstorage-mock';

describe("login function", () => {
  let originalWindow;

  beforeAll(() => {
    originalWindow = global.window;
    global.window = {
      location: {
        hostname: 'github.io',
        pathname: '/Semester_Project_2',
        origin: 'http://localhost',
      },
    };
  });

  afterAll(() => {
    global.window = originalWindow;
  });

  it("should save login data to browser's localStorage", async () => {
    const email = "nine@stud.noroff.no";
    const password = "TestPassword9";

    // Mocking authenticatedRequest to resolve with sample data upon login
    jest.spyOn(require('../js/api/auth/api.js'), 'authenticatedRequest').mockResolvedValue({
      accessToken: 'sampleAccessToken',
      name: 'testuser9',
      email: 'nine@stud.noroff.no',
      avatar: 'avatar-url.png',
      credits: '1000',
    });

    await loginUser(email, password);

    // Clean the retrieved values and the expected values for comparison
    const cleanValue = (value) => (value ? value.replace(/"/g, '') : '');
    
    // const storedAccessToken = localStorage.getItem("accessToken").replace(/"/g, '');
    const storedAccessToken = cleanValue(localStorage.getItem("accessToken"));
    const storedName = cleanValue(localStorage.getItem("name"));
    const storedEmail = cleanValue(localStorage.getItem("email"));
    const storedAvatar = cleanValue(localStorage.getItem("avatar"));
    const storedCredits = cleanValue(localStorage.getItem("credits"));

    // Set the expected values after cleaning
    const expectedName = 'testuser9';
    const expectedAccessToken = 'sampleAccessToken';
    const expectedEmail = 'nine@stud.noroff.no';
    const expectedAvatar = 'avatar-url.png';
    const expectedCredits = '1000';

    // Verify that the stored accessToken matches the expected value
    expect(storedAccessToken).toEqual(expectedAccessToken);
    expect(storedName).toEqual(expectedName);
    expect(storedEmail).toEqual(expectedEmail);
    expect(storedAvatar).toEqual(expectedAvatar);
    expect(storedCredits).toBe(expectedCredits);
  });
});