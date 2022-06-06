process.stdin.setEncoding('utf8');

const acceptHobbies = () => {
  process.stdin.removeAllListeners('close');
  process.stdin.removeAllListeners('data');
  console.log('Please enter your hobbies');
  process.stdin.on('data', (chunk) => {
    process.stdin.emit('close');
  });

  process.stdin.on('close', () => {
    console.log('Thank you');
  });
};

const acceptDob = () => {
  process.stdin.removeAllListeners('close');
  process.stdin.removeAllListeners('data');
  console.log('Please enter your dob:');
  process.stdin.on('data', (chunk) => {
    process.stdin.emit('close');
  });

  process.stdin.on('close', () => {
    acceptHobbies();
  });
};

const acceptName = () => {
  console.log('Please enter your name:');
  process.stdin.on('data', (chunk) => {
    process.stdin.emit('close');
  });

  process.stdin.on('close', () => {
    acceptDob();
  });
};

acceptName();
