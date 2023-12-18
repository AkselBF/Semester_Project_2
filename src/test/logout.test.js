import { logout } from '../js/api/auth/logout.js';
import 'jest-localstorage-mock';

describe("logout function", () => {
  it("should remove stored items from browser's localStorage", () => {
    localStorage.setItem("accessToken", "sampleAccessToken");
    localStorage.setItem("name", "testuser9");
    localStorage.setItem("email", "nine@stud.noroff.no");
    localStorage.setItem("avatar", "avatar-url.png");
    localStorage.setItem("credits", "1000");

    // Call the logout function
    logout();

    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(localStorage.getItem("name")).toBeNull();
    expect(localStorage.getItem("email")).toBeNull();
    expect(localStorage.getItem("avatar")).toBeNull();
    expect(localStorage.getItem("credits")).toBeNull();
  });
});