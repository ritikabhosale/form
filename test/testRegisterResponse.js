const { Form } = require('../form');
const { Field } = require('../src/field');
const { registerResponse } = require('../registerResponse.js');
const assert = require('assert');

const mockConsoleLog = (expectedOutput) =>
  actualContent => assert.equal(expectedOutput, actualContent);

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
    const logger = mockConsoleLog('Enter your dob');

    registerResponse(form, 'reva', identity, logger);
  });

  it('should fill a response and prompt next question', () => {
    const nameField = new Field('name', 'Enter your name');
    const dobField = new Field('dob', 'Enter your dob');
    const form = new Form(nameField, dobField);

    const identity = x => x;
    const logger = mockConsoleLog('Enter your dob');

    registerResponse(form, 'reva', identity, logger);
    const expectedResponses = { name: 'reva', dob: null };
    assert.deepStrictEqual(form.getResponses(), expectedResponses);
  });

  it('should print thank you when form filled', () => {
    const nameField = new Field('name', 'Enter your name');
    const form = new Form(nameField);

    const identity = x => x;
    const logger = mockConsoleLog('Thank you');

    registerResponse(form, 'reva', identity, logger);
  });

  it('should get the content of the form', () => {
    const nameField = new Field('name', 'Enter your name');
    const form = new Form(nameField);

    const identity = x => x;
    let actualResponses = '';
    const logger = mockConsoleLog('Thank you');
    const formContent = (form) => {
      actualResponses = form.getResponses();
    }
    const expectedResponses = { name: 'reva' };
    registerResponse(form, 'reva', formContent, logger);
    assert.deepStrictEqual(actualResponses, expectedResponses);
  });
});
