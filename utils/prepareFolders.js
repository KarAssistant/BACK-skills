const fs = require("fs");

module.exports.prepareFolders = () => {
  //Create files/folders if not exist
  if (!fs.existsSync(__dirname + "/../dataSkills")) fs.mkdirSync(__dirname + "/../dataSkills");
};
