const fs = require('fs');
const path = require('path');
require("./utils/prepareFolders").prepareFolders();


function listFilesRecursively(directoryPath = "") {
    // Lire le contenu du dossier
    const files = fs.readdirSync(path.join(__dirname, "skills", directoryPath));

    // Parcourir les fichiers
    for (const file of files) {
        const filePath = path.join(__dirname , "skills", directoryPath, file);

        // Vérifier si c'est un dossier
        if (fs.statSync(filePath).isDirectory()) {
            // Si c'est un dossier, appel récursif pour lister les fichiers de ce dossier
            const folderPath = path.join(__dirname, "data/skills", directoryPath, file);
            if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
            listFilesRecursively(path.join(directoryPath, file));
        } else {
            if(filePath.endsWith("text.json")){
                const src = path.join(__dirname, "skills", directoryPath, file);
                const dst = path.join(__dirname, "data/skills", directoryPath, file);
                fs.copyFileSync(src, dst);
                console.log(path.join(directoryPath, file))
            }
        }
    }
}

listFilesRecursively();