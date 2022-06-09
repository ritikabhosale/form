const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');
const assert = require('assert');
const { MultiLineField } = require('../src/multiLineField.js');

describe('Form', () => {
  it('should return the current field of the form', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);
    assert.ok(form.currentField().equals(nameField));
  });

  it('should return the current field prompt of the form', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);
    assert.equal(form.currentFieldPrompt(), 'Enter name');
  });

  it('should fill the given response in current field', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);
    form.fillField('sakshi');
    const expected = { name: 'sakshi' };
    assert.deepStrictEqual(form.getResponses(), expected);
  });

  it('should throw error if the response is not valid', () => {
    const isFiveDigits = str => str.length === 5;
    const nameField = new Field('name', 'Enter name', isFiveDigits);
    const form = new Form(nameField);
    assert.throws(() => form.fillField('sakshi'), new Error('Invalid Input'));
  });

  it('should return true when all fields are filled', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);
    form.fillField('sakshi');
    assert.equal(form.isFilled(), true);
  });

  it('should return true when all fields are filled', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);
    form.fillField('sakshi');
    assert.equal(form.isFilled(), true);
  });

  it('should return false when any field is unfilled', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('dob', 'Enter dob');
    const form = new Form(nameField, dobField);
    form.fillField('sakshi');
    assert.equal(form.isFilled(), false);
  });

  it('should return all the responses of each field', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('dob', 'Enter dob');
    const form = new Form(nameField, dobField);
    form.fillField('sakshi');
    form.fillField('2000-09-21');
    const expected = { name: 'sakshi', dob: '2000-09-21' }
    assert.deepStrictEqual(form.getResponses(), expected);
  });

  it('should return false when any multiLine field is unfilled', () => {
    const nameField = new Field('name', 'Enter name');
    const addressField = new MultiLineField('address', ['Enter line 1', 'Enter line 2']);
    const form = new Form(nameField, addressField);
    form.fillField('sakshi');
    addressField.fill('This is line 1');
    assert.equal(form.isFilled(), false);
  });
}); 