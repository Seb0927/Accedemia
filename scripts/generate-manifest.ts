import * as fs from 'fs';
import * as path from 'path';

// Define types for the file structure
interface FileEntry {
  file: {
    contents: string;
  };
}

interface DirectoryEntry {
  directory: FileTree;
}

type FileTree = {
  [name: string]: FileEntry | DirectoryEntry;
};

// Path to the learning project
const projectPath = path.join(process.cwd(), 'public', 'learning-project');
// Output path for the manifest
const outputPath = path.join(process.cwd(), 'public', 'learning-project-manifest.json');

// Recursively read directory and build file structure
function readDirRecursive(dir: string, basePath: string = ''): FileTree {
  const result: FileTree = {};
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);
    
    if (entry.isDirectory()) {
      result[entry.name] = {
        directory: readDirRecursive(entryPath, relativePath)
      };
    } else {
      try {
        // Read file content as UTF-8 text
        const content = fs.readFileSync(entryPath, 'utf-8');
        result[entry.name] = {
          file: {
            contents: content
          }
        };
      } catch (error) {
        console.error(`Error reading file ${entryPath}:`, error);
        // For binary files or files that can't be read as text, store as empty
        result[entry.name] = {
          file: {
            contents: ''
          }
        };
      }
    }
  }
  
  return result;
}

try {
  console.log('Generating learning project manifest...');
  const fileTree = readDirRecursive(projectPath);
  fs.writeFileSync(outputPath, JSON.stringify(fileTree), 'utf-8');
  console.log(`Manifest file generated at ${outputPath}`);
} catch (error) {
  console.error('Error generating manifest:', error);
  process.exit(1);
}