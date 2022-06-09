const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');
const { registerResponse } = require('../registerResponse.js');
const assert = require('assert');

const mockConsoleLog = (expectedOutput) => {
  let index = 0;
  return actualContent =>
    assert.equal(expectedOutput[index++], actualContent);
};

describe('registerResponse', () => {
  it('should fill a response', () => {
    const nameField = new Field('name', 'Enter your name');
    const form = new Form(nameField);

    const identity = x => x;

    registerResponse(form, 'reva', identity, identity);
    const expectedResponses = { name: 'reva' };
    assert.deepStrictEqual(form.getResponses(), expectedResponses);
  });

  it('should prompt next question', () => {
    const nameField = new Field('name', 'Enter your name');
    const dobField = new Field('dob', 'Enter your dob');
    const form = new Form(nameField, dobField);

    const identity = x => x;
    const logger = mockConsoleLog(['Enter your dob']);

    registerResponse(form, 'reva', identity, logger);
  });

  it('should fill a response and prompt next question', () => {
    const nameField = new Field('name', 'Enter your name');
    const dobField = new Field('dob', 'Enter your dob');
    const form = new Form(nameField, dobField);

    const identity = x => x;
    const logger = mockConsoleLog(['Enter your dob']);

    registerResponse(form, 'reva', identity, logger);
    const expectedResponses = { name: 'reva', dob: null };
    assert.deepStrictEqual(form.getResponses(), expectedResponses);
  });

  it('should print thank you when form filled', () => {
    const nameField = new Field('name', 'Enter your name');
    const form = new Form(nameField);

    const identity = x => x;
    const logger = mockConsoleLog(['Thank you']);

    registerResponse(form, 'reva', identity, logger);
  });

  it('should get the content of the form', () => {
    const nameField = new Field('name', 'Enter your name');
    const form = new Form(nameField);

    let actualResponses = '';
    const logger = mockConsoleLog(['Thank you']);
    const formContent = (responses) => {
      actualResponses = responses;
    }
    const expectedResponses = { name: 'reva' };
    registerResponse(form, 'reva', formContent, logger);
    assert.deepStrictEqual(actualResponses, expectedResponses);
  });

  it('should validate the name and reprompt', () => {
    const isLongEnough = (name) => name.length >= 5;
    const identity = x => x;

    const nameField = new Field('name', 'Enter your name', isLongEnough);
    const form = new Form(nameField);

    const logger = mockConsoleLog(['Invalid Input', 'Enter your name']);
    registerResponse(form, 'reva', identity, logger);
  });

  it('should validate the dob and reprompt', () => {
    const isDobValid = dob => /^\d{4}-\d{2}-\d{2}$/.test(dob);

    const identity = x => x;

    const dobField = new Field('name', 'Enter your dob', isDobValid);
    const form = new Form(dobField);

    const logger = mockConsoleLog(['Invalid Input', 'Enter your dob']);
    registerResponse(form, '2001-09-t6', identity, logger);
  });

  it('should parse hobbies into csv', () => {
    const doesExist = (name) => name.length > 0;
    const toCsv = str => str.split(',');
    const identity = x => x;

    const hobbiesField = new Field('hobbies', 'Enter hobbies', doesExist, toCsv);
    const form = new Form(hobbiesField);

    registerResponse(form, 'singing,dancing', identity, identity);
    const expected = { hobbies: ['singing', 'dancing'] };
    assert.deepStrictEqual(form.getResponses(), expected);
  });
});
