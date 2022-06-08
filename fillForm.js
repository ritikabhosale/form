const { Form } = require('./Form.js');
const { Field } = require('./src/field');

const registerResponses = (form, response) => {
  form.fillField(response);
  if (!form.isFilled()) {
    console.log(form.currentFieldPrompt());
    return;
  }
  process.stdin.destroy();
  console.log('Thank you');
};

const main = () => {
  const nameField = new Field('name', 'Enter your name');
  const dobField = new Field('dob', 'Enter your dob');
  const form = new Form(nameField, dobField);
  process.stdin.setEncoding('utf8');
  console.log(form.currentFieldPrompt());
  process.stdin.on('data', (response) =>
    registerResponses(form, response.trim()));
}

main();
