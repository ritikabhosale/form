const fs = require('fs');
const { Dob } = require('./dob');
const { Hobbies } = require('./hobbies');
const { Name } = require('./name');
process.stdin.setEncoding('utf8');

const removeLastChar = str => str.slice(0, -1);

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

const fields = [Name, Dob, Hobbies];
acceptDetails(fields);
