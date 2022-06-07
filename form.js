const fs = require('fs');
const { Dob } = require('./dob');
const { Hobbies } = require('./hobbies');
const { Name } = require('./name');
const { PhoneNo } = require('./phoneNo');
process.stdin.setEncoding('utf8');

const removeLastChar = str => str.slice(0, -1);

class Form {
  #fields;
  #fieldIndex;
  constructor(fields, fieldIndex) {
    this.#fields = fields;
    this.#fieldIndex = fieldIndex
  }
  question() {
    return this.#fields[this.#fieldIndex].question();
  }
  validate(input) {
    return this.#fields[this.#fieldIndex].validate(input);
  }
  set(input) {
    this.#fields[this.#fieldIndex].set(input);
  }
  nextField() {
    this.#fieldIndex++;
  }
  finished() {
    return this.#fields.length === this.#fieldIndex;
  }
  storeFormDetails() {
    const details = this.#fields.reduce((details, field) => {
      details[field.fieldName()] = field.getValue();
      return details;
    }, {});
    fs.writeFileSync('./details.json', JSON.stringify(details), 'utf8');
  }
}

const acceptDetails = (fields) => {
  const form = new Form(fields, 0);
  console.log(form.question());
  process.stdin.on('data', (chunk) => {
    const input = removeLastChar(chunk);
    if (form.validate(input)) {
      form.set(input);
      form.nextField();
    }
    if (form.finished()) {
      console.log('Thanks');
      form.storeFormDetails();
      process.exit();
    }
    console.log(form.question());
  });
};

const main = () => {
  const name = new Name('');
  const dob = new Dob('');
  const hobbies = new Hobbies('');
  const phoneNo = new PhoneNo('');
  acceptDetails([name, dob, hobbies, phoneNo]);
}

main();
