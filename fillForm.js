const fs = require('fs');
const { Form } = require('./form.js');
const { Field } = require('./src/field');
const { registerResponse } = require('./registerResponse.js');

const isNameValid = name => name.length >= 5;
const areHobbiesValid = hobbies => hobbies.length > 0;
const isDobValid = dob => /^\d{4}-\d{2}-\d{2}$/.test(dob);
const splitOnComma = str => str.split(',');
const areTenDigits = number => /\d{10}/.test(number);

const writeForm = (form) => {
  const responses = form.getResponses();
  fs.writeFileSync('details.json', JSON.stringify(responses), 'utf8');
  process.stdin.destroy();
};

const main = () => {
  const nameField = new Field('name', 'Enter your name', isNameValid);
  const dobField = new Field('dob', 'Enter your dob', isDobValid);
  const hobbiesField = new Field('hobbies', 'Enter your hobbies', areHobbiesValid, splitOnComma);
  const telephoneNo = new Field('telephoneNo', 'Enter your telephone No', areTenDigits);

  const form = new Form(nameField, dobField, hobbiesField, telephoneNo);
  process.stdin.setEncoding('utf8');
  console.log(form.currentFieldPrompt());

  process.stdin.on('data', (response) =>
    registerResponse(form, response.trim(), writeForm, console.log));
};

main();
