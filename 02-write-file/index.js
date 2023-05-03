const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

fs.writeFile(path.join(__dirname, 'text-file.txt'), '', err => {
  if (err) throw err;
});

stdout.write('Пожалуйста, добавьте заметку...\n');

stdin.on('data', data => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    console.log('До свидания!');
    exit();
  }
  fs.appendFile(path.join(__dirname, 'text-file.txt'), data, err => {
    if (err) console.log(err);
  });
});

//exit ctrl+c
process.on('SIGINT', () => {
  console.log('\nДо свидания!');
  exit();
});
