const { isValidTimeZone } = require("../isValidTimeZone");

describe("isValidTimeZone", () => {
  test("should return true for a valid timezone", () => {
    const validTimeZone = "America/New_York";
    expect(isValidTimeZone(validTimeZone)).toBe(true);
  });

  test("should return false for an invalid timezone", () => {
    const invalidTimeZone = "Invalid/Timezone";
    expect(isValidTimeZone(invalidTimeZone)).toBe(false);
  });

  test("should return false for an empty timezone", () => {
    const emptyTimeZone = "";
    expect(isValidTimeZone(emptyTimeZone)).toBe(false);
  });
});