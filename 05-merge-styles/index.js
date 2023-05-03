const fs = require('fs');
const path = require('path');
const pathStyles = path.join(__dirname, 'styles');
const pathProjectDist = path.join(__dirname, 'project-dist');
const bundleCss = path.join(pathProjectDist, 'bundle.css');
console.log(bundleCss);
//create bundle.css

fs.open(bundleCss, 'w', err => {
  if (err) throw err;
});

fs.readdir(pathStyles, { withFileTypes: true }, (err, arrs) => {
  if (err) throw err;

  //находит css в styles
  arrs.forEach(file => {
    if (file.isFile()) {
      if (file.name.includes('.css')) {
        //читает содержимое каждого .css
        fs.readFile(path.join(pathStyles, file.name), 'utf-8', (err, dataCss) => {
          if (!err) {
            //записывает в bundle.css
            fs.appendFile(bundleCss, dataCss, err => {
              if (err) throw err;
            });
          }
        });
      }
    }
  });
  console.log('Стили успешно добавлены');
});
