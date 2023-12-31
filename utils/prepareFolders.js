const fs = require("fs");
const path = require("path");

/**
 * Prepares the required folders and files for the application.
 * If the specified folders do not exist, this function creates them.
 * @function
 * @returns {void}
 * @throws {Error} Throws an error if there is a failure in creating the folders.
 * @example
 * // Usage example:
 * const fileSystemUtils = require('./fileSystemUtils'); // Replace with the correct path
 * fileSystemUtils.prepareFolders();
 */
module.exports.prepareFolders = () => {
  //Create files/folders if not exist
  if (!fs.existsSync(path.resolve(__dirname + "/../data/"))) fs.mkdirSync(path.resolve(__dirname + "/../data/"));
  if (!fs.existsSync(path.resolve(__dirname + "/../data/skills/"))) fs.mkdirSync(path.resolve(__dirname + "/../data/skills/"));
};
