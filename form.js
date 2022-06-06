const fs = require('fs');
process.stdin.setEncoding('utf8');

const isNameInvalid = name => {
  return !/^[a-z]*$/.test(name) || name.length < 5;
}

const removeLastChar = str => str.slice(0, -1);

const acceptHobbies = (details) => {
  process.stdin.removeAllListeners('close');
  process.stdin.removeAllListeners('data');
  console.log('Please enter your hobbies');
  process.stdin.on('data', (chunk) => {
    let hobbies = removeLastChar(chunk);
    details.hobbies = hobbies.split(',');
    process.stdin.emit('close');
  });

  process.stdin.on('close', () => {
    console.log('Thank you');
    fs.writeFileSync('./details.json', JSON.stringify(details), 'utf8');
  });
};

const acceptDob = (details) => {
  process.stdin.removeAllListeners('close');
  process.stdin.removeAllListeners('data');
  console.log('Please enter your dob (yyyy-mm-dd):');
  process.stdin.on('data', (chunk) => {
    const dob = removeLastChar(chunk);
    details.dob = dob;
    process.stdin.emit('close');
  });

  process.stdin.on('close', () => {
    acceptHobbies(details);
  });
};

const acceptName = (details) => {
  console.log('Please enter your name:');
  process.stdin.on('data', (chunk) => {
    const name = removeLastChar(chunk);
    details.name = name;
    process.stdin.emit('close');
  });

  process.stdin.on('close', () => {
    acceptDob(details);
  });
};

const details = {};
acceptName(details);
