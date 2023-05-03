const fs = require('fs');
const path = require('path');
const { stdout } = process;
const pathText = path.join(__dirname, 'text.txt');

try {
  fs.readFile(pathText, 'utf-8', (err, data) => {
    if (err) throw err;
    stdout.write(data);
  });
} catch {
  console.log(err);
}
