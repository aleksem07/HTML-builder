const fs = require('fs');
const path = require('path');

const pathFiles = path.join(__dirname, 'files');
const pathFilesCopy = path.join(__dirname, 'files-copy');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
  if (err) throw err;
});

fs.readdir(pathFiles, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      fs.copyFile(`${pathFiles}/${file.name}`, `${pathFilesCopy}/${file.name}`, err => {
        if (err) throw err;
      });
    }
  });
});
