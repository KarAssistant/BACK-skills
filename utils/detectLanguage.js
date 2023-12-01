const loadVector = require("./loadVector").loadVector;
const compareSentences = require("../universalSentenceEncoder/universalSentenceEncoder").compareSentences;
const sampleText = require("../skills/.detectLanguage/text.json");

module.exports.testLang = testLang;
async function testLang({ vector, lang, max }) {
    const result = {
        sum: 0,
        numbrePhraseTested: 0,
        lang
    }

    for (let index = 0; index < ((max && max < sampleText.phrases[lang].length) ? max : sampleText.phrases[lang].length); index++) {
        const phrase = sampleText.phrases[lang][index];
        const vectorTest = loadVector({phrase});
        if(vectorTest){
            const diff = await compareSentences(vector, vectorTest)
            
            result.sum += diff;
            result.numbrePhraseTested++;
        }
    }
    
    result.average = result.sum / result.numbrePhraseTested;
    delete result.sum;
    delete result.numbrePhraseTested;
    
    return result;
}

module.exports.detectLanguage = async (vector) => {
    const langs = Object.keys(sampleText.phrases);
    const resultLang = [];
    for (const lang of langs) {
        const result = await testLang({ vector, lang, max: 3 });
        console.log(result);
        resultLang.push(result);
    }

    resultLang.sort((a, b) => a.average - b.average);
    
    //No big gap between first and second languages
    if(Math.abs(resultLang[0].average - resultLang[1].average) < 0.02) return resultLang[0].lang;

    //Result for the first two languages too close
    const resultFirstLang = await testLang({ vector, lang: resultLang[0].lang });
    const resultSecondLang = await testLang({ vector, lang: resultLang[1].lang });

    return resultFirstLang.average < resultSecondLang.average ? resultFirstLang.lang : resultSecondLang.lang;
}
