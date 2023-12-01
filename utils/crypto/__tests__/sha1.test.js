const crypto = require('crypto');
const sha1 = require("../sha1").sha1;

describe("isValidTimeZone", () => {
  const createHashSpy = jest.spyOn(crypto, 'createHash');

  test("should return true for a valid timezone", () => {
    const result = sha1("test");

    expect(result).toBe("a94a8fe5ccb19ba61c4c0873d391e987982fbbd3")
    expect(createHashSpy).toHaveBeenCalledWith('sha1');
  });
});