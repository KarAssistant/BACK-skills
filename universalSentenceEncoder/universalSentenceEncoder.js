const tf = require("@tensorflow/tfjs");
try {
  require("@tensorflow/tfjs-node");
} catch {}

module.exports.createVector = (values) => {
  return tf.tensor(values, [1, 512], "float32");
};

module.exports.compareSentences = async (embedding1, embedding2) => {
  return (await tf.losses.cosineDistance(embedding1, embedding2).data())[0];
};

/* c8 ignore start */
async function saveQueryClose(result, query) {
  const dataRead = fs.readFileSync(__dirname + "/../data/querriesClose.json", "utf8");
  const content = JSON.parse(dataRead);
  content.push({
    query,
    similarity: result.similarity,
    lang: result.lang,
    skill: result.skill,
    bestPhrase: result.bestPhrase,
  });
  const dataWrite = JSON.stringify(content);
  fs.writeFileSync(__dirname + "/../data/querriesClose.json", dataWrite, "utf8");
}
/* c8 ignore stop */