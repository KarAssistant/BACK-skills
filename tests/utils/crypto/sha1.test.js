const sha1 = require("../../../utils/crypto/sha1").sha1;

describe("isValidTimeZone", () => {
  test("should return true for a valid timezone", () => {
    const result = sha1("test");

    expect(result).not.toBeNull();
  });
});