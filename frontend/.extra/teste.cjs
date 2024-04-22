const fs = require('fs');
const path = require('path');

function getFoldersWithIndexHtml(directory) {
  const folders = [];

  function searchFolders(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const indexHtmlPath = path.join(filePath, 'index.html');
        if (fs.existsSync(indexHtmlPath)) {
          folders.push(filePath);
        }
        searchFolders(filePath);
      }
    }
  }

  searchFolders(directory);
  // Remove evertyhin before /static
  return folders.map((folder) => folder.split('/static')[1]);
  return folders;
}

// Usage example
const actualDirectory = path.dirname(__filename);
const foldersWithIndexHtml = getFoldersWithIndexHtml(actualDirectory);
console.log(foldersWithIndexHtml);

// Output to a .txt file
fs.writeFileSync(
  path.join(actualDirectory, 'foldersWithIndexHtml.txt'),
  foldersWithIndexHtml.join('\n')
);