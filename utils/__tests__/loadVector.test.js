const fs = require("fs");
const path = require('path');
const sha1 = require("../crypto/sha1");
const universalSentenceEncoder = require("../../universalSentenceEncoder/universalSentenceEncoder");

jest.mock("../crypto/sha1");
const sha1Spy = jest.spyOn(sha1, 'sha1');
jest.mock("../../universalSentenceEncoder/universalSentenceEncoder");
const createVectorSpy = jest.spyOn(universalSentenceEncoder, 'createVector');

const { loadVector } = require("../loadVector");

describe('loadVector', () => {
    jest.mock('fs');
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockReturnValue(`{"vector":"data"}`);
    
    it('Load Vector', () => {
        const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        const vectorFolder = path.resolve(__dirname + "/../data/vectors/");

        //Execution
        const vector = loadVector({phrase:"test"});

        //Check
        expect(sha1Spy).toHaveBeenCalled();
        expect(existsSyncSpy).toHaveBeenCalled();
        expect(readFileSyncSpy).toHaveBeenCalled();
        expect(createVectorSpy).toHaveBeenCalledWith({vector:'data'});
        expect(vector).toBe("mock_vector");
    });
    
    it('Data does not exist', () => {
        const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

        //Execution
        const vector = loadVector({phrase:"test"});

        //Check
        expect(sha1Spy).toHaveBeenCalled();
        expect(existsSyncSpy).toHaveBeenCalled();
        expect(readFileSyncSpy).not.toHaveBeenCalled();
        expect(createVectorSpy).not.toHaveBeenCalled();
        expect(vector).toBeNull();
    });
});
