const fs = require('fs');
const path = require('path');

const pathFiles = path.join(__dirname, 'files');
const pathFilesCopy = path.join(__dirname, 'files-copy');

fs.mkdir(pathFilesCopy, { recursive: true }, err => {
  if (!err) console.log('Папка создана');
});

fs.readdir(pathFiles, { withFileTypes: true }, (err, files) => {
  if (!err)
    files.forEach(file => {
      if (file.isFile()) {
        fs.copyFile(`${pathFiles}/${file.name}`, `${pathFilesCopy}/${file.name}`, err => {
          if (!err) console.log(`${file.name} успешно скопирован`);
        });
      }
    });
});
