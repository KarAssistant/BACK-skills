const fs = require("fs");
const { prepareFolders } = require("../../utils/prepareFolders");

describe("prepareFolders", () => {
  it("should create 'data/skills' folder if it doesn't exist", () => {
    // Appeler la fonction
    prepareFolders();

    // Vérifier si le dossier a été créé
    expect(fs.existsSync(__dirname + "/../../data/skills")).toBe(true);
  });

  it("should not recreate 'dataSkills' folder if it already exists", () => {
    // Mocking fs.existsSync and fs.readFileSync
    jest.mock('fs');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'mkdirSync').mockReturnValue();

    // Appeler la fonction
    prepareFolders();

    jest.restoreAllMocks();
    // Vérifier si le dossier existe toujours
    expect(fs.existsSync(__dirname + "/../../data/skills")).toBe(true);
  });
});