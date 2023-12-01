const fs = require("fs");
const path = require("path");
const { prepareFolders } = require("../prepareFolders");

describe("prepareFolders", () => {
  // Mocking fs.existsSync and fs.readFileSync
  jest.mock('fs');
  const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockReturnValue();

  it("All folders are already created", () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    prepareFolders();

    //Check results
    expect(existsSyncSpy).toHaveBeenCalledTimes(2);
    expect(mkdirSyncSpy).toHaveBeenCalledTimes(0);
  });

  it("Folders are not created", () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    // Appeler la fonction
    prepareFolders();

    //Check results
    expect(existsSyncSpy).toHaveBeenCalledTimes(2);
    expect(mkdirSyncSpy).toHaveBeenCalledWith(path.resolve(__dirname + "/../../data/"))
    expect(mkdirSyncSpy).toHaveBeenCalledWith(path.resolve(__dirname + "/../../data/skills/"))
  });
});