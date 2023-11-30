const moment = require("moment-timezone");

/**
 * Checks if the provided time zone is valid.
 *
 * @param {string} timezone - The name of the time zone to check.
 * @returns {boolean} - True if the time zone is valid, otherwise False.
 * @throws {Error} - Throws an error if the parameter is not a string.
 * @example
 * const isValid = isValidTimeZone("America/New_York");
 * // Returns true if "America/New_York" is a valid time zone.
 */
module.exports.isValidTimeZone = (timezone) => {
  return moment.tz.zone(timezone) != null;
};