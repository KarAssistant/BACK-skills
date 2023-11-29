const fs = require("fs")
const createVector = require("./universalSentenceEncoder/universalSentenceEncoder").createVector;
const getAnswer = require("./universalSentenceEncoder/query").getAnswer

const idRequest = process.argv[2];
const filePathQuery = __dirname + "/data/users/queries/" + idRequest + ".json"
if (!fs.existsSync(filePathQuery)) {
    console.log(`\x1b[31mERROR: id for query '\x1b[33m${idRequest}\x1b[31m' does not exist\x1b[0m`);
    return;
}
const vectorData = JSON.parse(fs.readFileSync(filePathQuery, 'utf-8'));

const userToken = vectorData.userToken;
const filePathUser = __dirname + "/data/users/users/" + userToken + ".json"
if (!fs.existsSync(filePathQuery)) {
    console.log(`\x1b[31mERROR: id for user '\x1b[33m${userToken}\x1b[31m' does not exist\x1b[0m`);
    return;
}
const userData = JSON.parse(fs.readFileSync(filePathUser, 'utf-8'));

// Request valid

async function start(){
    const vector = createVector(vectorData.vector);

    const { result } = await getAnswer({ userData, vector, ipAddress: vectorData.ipAddress })
    vectorData.result = result;
    delete vectorData.vector;
    
    fs.writeFileSync(filePathQuery, JSON.stringify(vectorData));
}

start()
