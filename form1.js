const fs = require('fs');
process.stdin.setEncoding('utf8');

const removeLastChar = str => str.slice(0, -1);

class Name {
  #name;
  constructor(name) {
    this.#name = name;
  }
  validate(name) {
    return /^[a-z]*$/.test(name) && name.length > 4;
  }
  question() {
    return 'Pls enter your name:';
  }
  set(name) {
    this.#name = name;
  }
  fieldName() {
    return 'name';
  }
  getValue() {
    return this.#name;
  }
}

class Dob {
  #dob;
  constructor(dob) {
    this.#dob = dob;
  }
  validate(dob) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dob);
  }
  question() {
    return 'Pls enter your dob:'
  }
  set(dob) {
    this.#dob = dob;
  }
  fieldName() {
    return 'dob';
  }
  getValue() {
    return this.#dob;
  }
}

const storeData = (inputs) => {
  const data = {};
  inputs.reduce((data, input) => {
    data[input.fieldName()] = input.getValue();
    return data;
  }, data);
  fs.writeFileSync('./details.json', JSON.stringify(data), 'utf8');
};

const acceptDetails = (fields) => {
  let index = 0;
  let askFor = new fields[index]('');
  const inputs = [];
  console.log(askFor.question());

  process.stdin.on('data', (chunk) => {
    const input = removeLastChar(chunk);
    if (askFor.validate(input)) {
      askFor.set(input);
      inputs.push(askFor);
      index++;
      if (index === fields.length) {
        storeData(inputs);
        console.log('Thank you');
        process.exit();
      }
      askFor = new fields[index]('');
    }
    console.log(askFor.question());
  });
};

const fields = [Name, Dob];
acceptDetails(fields);
