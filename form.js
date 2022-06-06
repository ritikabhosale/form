const fs = require('fs');
const { Dob } = require('./dob');
const { Hobbies } = require('./hobbies');
const { Name } = require('./name');
const { PhoneNo } = require('./phoneNo');
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
  let field = new fields[index]('');
  const inputs = [];
  console.log(field.question());

  process.stdin.on('data', (chunk) => {
    const input = removeLastChar(chunk);
    if (field.validate(input)) {
      field.set(input);
      inputs.push(field);
      index++;
      if (index === fields.length) {
        storeData(inputs);
        console.log('Thank you');
        process.exit();
      }
      field = new fields[index]('');
    }
    console.log(field.question());
  });
};

const fields = [Name, Dob, Hobbies, PhoneNo];
acceptDetails(fields);
