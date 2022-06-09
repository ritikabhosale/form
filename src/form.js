const { Field } = require('./field.js');
const { MultiLineField } = require('./multiLineField.js');

class Form {
  #fields;
  #currentFieldIndex;
  constructor(...fields) {
    this.#fields = fields;
    this.#currentFieldIndex = 0;
  }

  currentField() {
    return this.#fields[this.#currentFieldIndex];
  }

  currentFieldPrompt() {
    return this.currentField().getPrompt();
  }

  fillField(response) {
    if (!this.#validate(response)) {
      throw new Error('Invalid Input');
    }
    this.currentField().fill(response);
    if (this.currentField().isFieldFilled()) {
      this.#currentFieldIndex++;
    }
  }

  isFilled() {
    return this.#fields.every(field => field.isFieldFilled());
  }

  #validate(response) {
    return this.currentField().isValid(response);
  }

  getResponses() {
    const responses = {};
    this.#fields.forEach(field => {
      const { name, response } = field.getEntry();
      responses[name] = field.parse(response);
    });
    return responses;
  }
}

const isNameValid = name => name.length >= 5;
const doesExist = hobbies => hobbies.length > 0;
const isDobValid = dob => /^\d{4}-\d{2}-\d{2}$/.test(dob);
const splitOnComma = str => str.split(',');
const joinLines = lines => lines.join('\n');
const areTenDigits = number => /\d{10}/.test(number);

const createForm = () => {
  const nameField = new Field('name', 'Enter your name', isNameValid);
  const dobField = new Field('dob', 'Enter your dob', isDobValid);
  const hobbiesField = new Field('hobbies', 'Enter your hobbies', doesExist, splitOnComma);
  const telephoneNo = new Field('telephoneNo', 'Enter your telephone No', areTenDigits);
  const address = new MultiLineField('address', ['Enter address Line 1', 'Enter address Line 2'], doesExist, joinLines);

  return new Form(nameField, dobField, hobbiesField, telephoneNo, address);
};

module.exports = { createForm, Form };
