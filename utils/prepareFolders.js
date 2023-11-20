const fs = require("fs");

module.exports.prepareFolders = () => {
  //Create files/folders if not exist
  if (!fs.existsSync(__dirname + "/../skillsData")) fs.mkdirSync(__dirname + "/../skillsData");
};
