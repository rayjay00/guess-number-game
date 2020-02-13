import { formatNumText, generateRandomNumber, isValidEntry } from "./utils";

describe("formatNumText", () => {
  test("formats correctly", () => {
    expect(formatNumText(10000)).toEqual("10,000");
    expect(formatNumText("test string")).toEqual("test string");
  });
});

describe("generateRandomNumber", () => {
  test("returns if the value is valid", () => {
    const numOne = generateRandomNumber(1, 10);
    expect(numOne).toBeLessThanOrEqual(10);
    expect(numOne).toBeGreaterThanOrEqual(1);

    const numTwo = generateRandomNumber(-20, 55);
    expect(numTwo).toBeLessThanOrEqual(55);
    expect(numTwo).toBeGreaterThanOrEqual(-20);
  });
});

describe("isValidEntry", () => {
  test("returns if the value is valid", () => {
    expect(isValidEntry("-")).toBeFalsy();
    expect(isValidEntry("-10")).toBeTruthy();
    expect(isValidEntry(-10)).toBeTruthy();
    expect(isValidEntry(10)).toBeTruthy();
  });
});
