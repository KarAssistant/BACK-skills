const fs = require("fs");
const path = require('path');
let createVector = require("../universalSentenceEncoder/universalSentenceEncoder").createVector;
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
module.exports.sha1 = sha1;
function sha1(str) {
    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(str);
    return sha1sum.digest('hex');
}

/**
 * Loads a vector from the file system based on the provided phrase.
 * If the vector file exists, it reads and parses the data to create a vector.
 * @function
 * @param {Object} options - The options for loading the vector.
 * @param {string} options.phrase - The phrase for which the vector is to be loaded.
 * @returns {Vector | null} Returns the loaded vector or null if the vector file does not exist.
 * @throws {Error} Throws an error if there is an issue with reading or parsing the vector file.
 * @example
 * // Usage example:
 * const vectorLoader = require('./vectorLoader');
 * const loadedVector = vectorLoader.loadVector({ phrase: 'example phrase' });
 * if (loadedVector) {
 *   // Process the loaded vector
 *   console.log('Vector loaded:', loadedVector);
 * } else {
 *   console.log('Vector not found for the specified phrase.');
 * }
 */
module.exports.loadVector = ({ phrase }) => {
    const hash = sha1(phrase);
    const filePath = path.resolve(__dirname + "/../data/vectors/" + hash + ".json");
    if (fs.existsSync(filePath)){
        const vectorData = JSON.parse(fs.readFileSync(filePath));
        const vector = createVector(vectorData);
        return vector;
    }
    return null;
}