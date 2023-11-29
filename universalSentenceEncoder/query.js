const useSkills = require("./useSkills");
const findSkill = useSkills.findSkill;
const runSkill = useSkills.runSkill;
const detectLanguage = require("../utils/detectLanguage").detectLanguage;

module.exports.getAnswer = getAnswer;
async function getAnswer({ userData, phrase, vector, ipAddress = "127.0.0.1" }) {
  const lang = await detectLanguage(vector);

  const skillData = await findSkill({vector, lang})
  const result = await runSkill({phrase, skillData, userData})

  return { result };
}
