const fs = require('fs');
const path = require('path');
const { loadVector } = require("../../utils/loadVector");
const { sha1 } = require("../../utils/crypto/sha1");

// Mocking des modules externes
jest.mock('fs');
jest.mock("../../utils/crypto/sha1");

describe('loadVector', () => {
  // Mock de la fonction sha1
  const mockSha1 = jest.fn();
  jest.mock("../../utils/crypto/sha1", () => mockSha1);

  // Test lorsque le fichier existe
  test('charge le vecteur à partir du fichier existant', () => {
    const phrase = 'exemple de phrase';
    const hash = 'hash_fictif';  // Utilisez la valeur de hash que vous attendez ici
    const filePath = path.resolve(__dirname + "/../data/vectors/" + hash + ".json");
    const vectorData = { /* les données de votre vecteur fictif */ };
    const expectedVector = { /* le vecteur attendu basé sur vectorData */ };

    mockSha1.mockReturnValue(hash);
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValueOnce(JSON.stringify(vectorData));

    const result = loadVector({ phrase });

    expect(mockSha1).toHaveBeenCalledWith(phrase);
    expect(fs.existsSync).toHaveBeenCalledWith(filePath);
    expect(fs.readFileSync).toHaveBeenCalledWith(filePath);
    expect(result).toEqual(expectedVector);
  });

  // Test lorsque le fichier n'existe pas
  test('retourne null lorsque le fichier n\'existe pas', () => {
    const phrase = 'phrase inexistante';

    mockSha1.mockReturnValue('hash_inexistant');  // Utilisez la valeur de hash que vous attendez ici
    fs.existsSync.mockReturnValue(false);

    const result = loadVector({ phrase });

    expect(mockSha1).toHaveBeenCalledWith(phrase);
    expect(result).toBeNull();
  });
  
  // Ajoutez d'autres tests en fonction de vos besoins
});
