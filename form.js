const fs = require('fs');
process.stdin.setEncoding('utf8');

const acceptHobbies = (details) => {
  process.stdin.removeAllListeners('close');
  process.stdin.removeAllListeners('data');
  console.log('Please enter your hobbies');
  process.stdin.on('data', (chunk) => {
    const hobbies = chunk.split(',');
    details.hobbies = hobbies;
    process.stdin.emit('close');
  });

  process.stdin.on('close', () => {
    console.log(JSON.stringify(details));
    fs.writeFileSync('./details.json', JSON.stringify(details), 'utf8');
  });
};

const acceptDob = (details) => {
  process.stdin.removeAllListeners('close');
  process.stdin.removeAllListeners('data');
  console.log('Please enter your dob (yyyy-mm-dd):');
  process.stdin.on('data', (chunk) => {
    details.dob = chunk;
    process.stdin.emit('close');
  });

  process.stdin.on('close', () => {
    acceptHobbies(details);
  });
};

const acceptName = (details) => {
  console.log('Please enter your name:');
  process.stdin.on('data', (chunk) => {
    details.name = chunk;
    process.stdin.emit('close');
  });

  process.stdin.on('close', () => {
    acceptDob(details);
  });
};

const details = {};
acceptName(details);
