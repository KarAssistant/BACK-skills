const crypto = require('crypto');

/**
 * Generates the SHA-1 hash for the provided string.
 * @function
 * @param {string} str - The input string for which the SHA-1 hash is to be generated.
 * @returns {string} The SHA-1 hash as a hexadecimal string.
 * @throws {Error} Throws an error if there is an issue with the hashing process.
 * @example
 * // Usage example:
 * const sha1Hasher = require('./loadVector');
 * const hash = sha1Hasher.sha1('exampleString');
 * console.log('SHA-1 Hash:', hash);
 */
module.exports.sha1 = (str) => {
    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(str);
    return sha1sum.digest('hex');
}