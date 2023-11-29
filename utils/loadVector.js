const fs = require("fs")
const createVector = require("../universalSentenceEncoder/universalSentenceEncoder").createVector;
const crypto = require('crypto');

function sha1(str) {
    const sha1sum = crypto.createHash('sha1');
    sha1sum.update(str);
    return sha1sum.digest('hex');
}

module.exports.loadVector = ({ phrase }) => {
    const hash = sha1(phrase);
    const filePath = __dirname + "/../data/vectors/" + hash + ".json";
    if (fs.existsSync(filePath)){
        const vectorData = JSON.parse(fs.readFileSync(filePath));
        const vector = createVector(vectorData);
        return vector;
    }
    return null;
}