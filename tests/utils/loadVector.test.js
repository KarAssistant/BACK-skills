const fs = require("fs");
const path = require('path');
const crypto = require('crypto');
const pathRootProject = path.resolve(__dirname+"/../../")
jest.mock(pathRootProject + "/universalSentenceEncoder/universalSentenceEncoder");
const createVector = require(pathRootProject + "/universalSentenceEncoder/universalSentenceEncoder");
const loadVector = require(pathRootProject + "/utils/loadVector");
const sampleVectorData = require("../sampleFile/vector.json");
const sha1 = require("../../utils/crypto/sha1");

describe('loadVector', () => {
    const mockPhrase = 'example phrase';
    const mockHash = 'mockHash';
    const mockFilePath = `${pathRootProject}/data/vectors/${mockHash}.json`;
    const mockVector = {test:"test"}

    // Mocking fs.existsSync and fs.readFileSync
    jest.mock('fs');
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(sampleVectorData));

    // Mocking crypto.createHash
    jest.spyOn(crypto, 'createHash').mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(mockHash),
    });

    jest.mock("../../utils/crypto/sha1");
    jest.spyOn(sha1, 'sha1').mockReturnValue("mockVector");

    jest.spyOn(createVector, 'createVector').mockReturnValue(mockVector);

    it('should load vector from file if it exists', () => {
        const result = loadVector.loadVector({ phrase: mockPhrase });

        expect(fs.existsSync).toHaveBeenCalledWith(mockFilePath);
        expect(createVector.createVector).toHaveBeenCalledWith(sampleVectorData);
        expect(result).toEqual(mockVector);
    });

    it('should return null if vector file does not exist', () => {
        fs.existsSync.mockReturnValue(false);

        const result = loadVector.loadVector({ phrase: mockPhrase });

        expect(fs.existsSync).toHaveBeenCalledWith(mockFilePath);
        expect(createVector.createVector).not.toHaveBeenCalled();
        expect(result).toBeNull();
    });
});
