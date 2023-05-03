const fs = require('fs');
const path = require('path');

const pathProjectDist = path.join(__dirname, 'project-dist');
const pathAssetsDist = path.join(pathProjectDist, 'assets');
const pathAssetsOrigin = path.join(__dirname, 'assets');
const pathStyleDist = path.join(pathProjectDist, 'style.css');
const pathIndexHtmlDist = path.join(pathProjectDist, 'index.html');
const pathComponents = path.join(__dirname, 'components');
const pathStyleOrigin = path.join(__dirname, 'styles');
const pathTemplateOrigin = path.join(__dirname, 'template.html');
//создает папку project-dist
fs.mkdir(pathProjectDist, { recursive: true }, err => {
  if (err) throw err;
});
//создает папку assets
fs.mkdir(pathAssetsDist, { recursive: true }, err => {
  if (err) throw err;
});
//создает файл style.css
fs.open(pathStyleDist, 'w', err => {
  if (err) throw err;
});
//создает файл imdex.html
fs.open(pathIndexHtmlDist, 'w', err => {
  if (err) throw err;
});

//собирает стили
async function copyStyles() {
  try {
    await fs.readdir(pathStyleOrigin, { withFileTypes: true }, (err, data) => {
      if (err) throw err;
      data.forEach(file => {
        if (file.isFile()) {
          if (file.name.includes('.css')) {
            fs.readFile(path.join(pathStyleOrigin, file.name), 'utf-8', (err, dataCss) => {
              if (!err) {
                fs.appendFile(pathStyleDist, dataCss, err => {
                  if (err) throw err;
                });
              }
            });
          }
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}
copyStyles();

//Копирует папку assets в project-dist/assets

async function copyAssets() {
  try {
    await fs.readdir(pathAssetsOrigin, { withFileTypes: true }, (err, data) => {
      if (err) throw err;
      data.forEach(folder => {
        if (!folder.name.isFile) {
          fs.mkdir(`${pathAssetsDist}/${folder.name}`, { recursive: true }, err => {
            if (err) throw err;
          });

          fs.readdir(path.join(pathAssetsOrigin, folder.name), { withFileTypes: true }, (err, files) => {
            if (!err) {
              files.forEach(file => {
                if (file.isFile()) {
                  fs.copyFile(
                    `${pathAssetsOrigin}/${folder.name}/${file.name}`,
                    `${pathAssetsDist}/${folder.name}/${file.name}`,
                    err => {
                      if (err) throw err;
                    }
                  );
                }
              });
            }
          });
        }
      });
      console.log(`Assets успешно скопирован`);
    });
  } catch (err) {
    console.log(err);
  }
}
copyAssets();

async function createIndex() {
  try {
    fs.readdir(pathComponents, { withFileTypes: true }, (err, data) => {
      if (err) throw err;
      data.forEach(file => {
        if (file.name.includes('.html') && file.isFile()) {
          fs.readFile(path.join(pathComponents, file.name), 'utf-8', (err, dataComp) => {
            if (!err) {
              fs.readFile(pathTemplateOrigin, 'utf-8', (err, data) => {
                if (err) throw err;
                fs.appendFile(
                  pathIndexHtmlDist,
                  data.toString().replace(`{{${file.name.slice(0, -5)}}}`, dataComp.toString()),
                  err => {
                    if (err) throw err;
                  }
                );
              });
            }
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

createIndex();
