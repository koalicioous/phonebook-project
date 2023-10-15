/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
import {
  checkSpecialCharacter,
  checkValidNumber,
  debounce,
  formatAddContactPayload,
} from "../";

describe("Utility Functions", () => {
  it("checks for special characters correctly", () => {
    expect(checkSpecialCharacter("abc123")).toBe(true);
    expect(checkSpecialCharacter("~!@#$%^&*()_+|{}“:?><[]\\;’,./=-")).toBe(
      false
    );
  });

  it("checks for valid numbers correctly", () => {
    expect(checkValidNumber("+123456789")).toBe(true);
    expect(checkValidNumber("12345")).toBe(true);
    expect(checkValidNumber("abc")).toBe(false);
  });

  it("delays function execution with debounce", async () => {
    jest.useFakeTimers();
    const mockFunction = jest.fn();
    const debouncedFunction = debounce(mockFunction, 500);

    debouncedFunction();

    expect(mockFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(mockFunction).toHaveBeenCalled();
  });

  it("formats add contact payload correctly", () => {
    const contactInput = {
      firstName: "John",
      lastName: "Doe",
      numbers: [{ value: "123456789" }],
    };
    const result = formatAddContactPayload(contactInput);
    expect(result).toEqual({
      first_name: "John",
      last_name: "Doe",
      phones: [{ number: "123456789" }],
    });
  });
});
