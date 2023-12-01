const { createVector, compareSentences } = require("../universalSentenceEncoder");
const sampleVector1 = require("../../tests/sampleFile/vector1.json");
const sampleVector2 = require("../../tests/sampleFile/vector2.json");

describe("createVector", () => {
  it("Create vector", () => {
    const result = createVector(sampleVector1);

    //Check results
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('size');
    expect(result).toHaveProperty('shape');
  });
});

describe("compareSentences", () => {
  it("Compare sentences", async() => {
    const vector1 = createVector(sampleVector1);
    const vector2 = createVector(sampleVector2);
    const result = await compareSentences(vector1, vector2);

    //Check results
    expect(result).toBe(-0.04318797588348389)
  });
});