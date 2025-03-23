import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'CompraFacilAccesible');
const outputPath = path.join(__dirname, 'projectFiles.json');

function generateFileStructure(dirPath) {
  const files = fs.readdirSync(dirPath);
  const structure = {};

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      structure[file] = {
        directory: generateFileStructure(filePath)
      };
    } else {
      structure[file] = {
        file: {
          contents: fs.readFileSync(filePath, 'utf-8')
        }
      };
    }
  });

  return structure;
}

const projectFiles = generateFileStructure(directoryPath);

fs.writeFileSync(outputPath, JSON.stringify(projectFiles, null, 2), 'utf-8');
console.log('projectFiles.json has been generated.');