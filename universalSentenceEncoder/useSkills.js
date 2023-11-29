const fs = require("fs");
const loadVector = require("../utils/loadVector").loadVector;
const compareSentences = require("../universalSentenceEncoder/universalSentenceEncoder").compareSentences;
const skillsList = getAllSkills();

function loadSkill({ skill, lang }) {
  console.log("-- " + skill);
  const file = require(__dirname + "/../skills/" + skill + "/text.json");
  const phrases = file.phrases;

  return phrases[lang];
};

function getAllSkills(path = "") {
  let result = [];
  if (fs.lstatSync(__dirname + "/../skills/" + path).isDirectory()) {
    const elementExist = fs.existsSync(__dirname + "/../skills/" + path + "/index.js");
    const elementIsFile = elementExist ? fs.lstatSync(__dirname + "/../skills/" + path + "/index.js").isFile() : false;

    if (elementExist && elementIsFile) {
      result.push(path);
    } else {
      const elements = fs.readdirSync(__dirname + "/../skills/" + path);
      for (const element of elements) {
        if (element[0] !== ".") {
          const resultFolder = getAllSkills(`${path}${path != "" ? "/" : ""}${element}`);
          result = result.concat(resultFolder);
        }
      }
    }
  }

  return result;
}

module.exports.findSkill = findSkill;
async function findSkill({vector, lang}) {
  const result = { similarity: 1, bestPhrase: "", shortAnswerExpected: false };

  // Find the best skill with the sentence
  for (let index = 0; index < skillsList.length; index++) {
    if (result.similarity < 0.1) break
    const folder = skillsList[index];

    const phrasesSkill = loadSkill({ skill: folder, lang });
    for (const phrase of phrasesSkill) {
      if (result.similarity < 0.1) break
      const vectorTest = loadVector({ phrase })
      
      const similarity = await compareSentences(vector, vectorTest);

      if (similarity < result.similarity) {
        result.similarity = similarity;
        result.lang = lang;
        result.bestPhrase = phrase;
        result.skill = folder;
      }
    }
  }

  return result;
}


module.exports.runSkill = runSkill;
/**
 * Executes a skill and updates the skillData with the result.
 *
 * @param {Object} options - The options object.
 * @param {string} options.phrase - The input phrase for the skill.
 * @param {Object} options.skillData - The data associated with the skill.
 * @param {string} options.skillData.skill - The name of the skill to execute.
 * @param {string} options.skillData.lang - The language of the skill.
 * @param {Object} [options.userData] - User data object.
 * @param {Object} [options.userData.data] - Data associated with the user.* 
 * @returns {Promise<{
 *   similarity: number,
 *   bestPhrase: string,
 *   shortAnswerExpected: boolean,
 *   lang: string,
 *   skill: string,
 *   result: string
 * }>} - A promise that resolves to the updated skillData.
 * @throws {null} - Throws null in case of an error, with the error logged to the console.
 */
async function runSkill({phrase, skillData, userData}) {
  try {
    // Execute the specified skill and get the result
    const skillResult = await require(__dirname + "/../skills/" + skillData.skill).execute({
      phrase,
      lang: skillData.lang,
      userData: userData ? userData.data : null
    });

    // Update skillData with the result
    skillData.result = skillResult.text;
    skillData.shortAnswerExpected = !! skillResult.shortAnswerExpected;
    
    // if (skillResult.userData) userData.data = skillResult.userData;
    // if (skillResult.session) {
    //   if (!clientContent.session) clientContent.session = {};
    //   clientContent.session.skill = skillData.skill;
    //   clientContent.session.lang = skillData.lang;
    //   clientContent.session.data = skillResult.session;
    // }

    // Return the updated skillData
    return skillData;
  } catch (error) {
    // Log error information to the console
    console.log("\x1b[31mERROR: skill " + skillData.skill + "\x1b[0m");
    console.log(error);

    // Throw null to indicate an error
    throw null;
  }
}
