const fs = require('fs');
const path = require('path');
const pathSecretFolder = path.join(__dirname, 'secret-folder');
fs.readdir(pathSecretFolder, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    if (file.isFile()) {
      const dot = file.name.indexOf('.');
      const name = file.name.slice(0, dot);
      const extension = file.name.slice(dot + 1);

      fs.stat(`${pathSecretFolder}/${file.name}`, (err, file) => {
        if (err) throw err;
        console.log(`${name} - ${extension} - ${file.size}b`);
      });
    }
  });
});
