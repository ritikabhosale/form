const { Field } = require('../src/field');
const assert = require('assert');

describe('Field', () => {
  it('should check the equality of two fields', () => {
    const nameField1 = new Field('name', 'Enter your name');
    const nameField2 = new Field('name', 'Enter your name');
    assert.ok(nameField1.equals(nameField2));
  });

  it('should return the prompt of field', () => {
    const nameField = new Field('name', 'Enter your name');
    assert.deepEqual(nameField.getPrompt(), 'Enter your name');
  });

  it('should fill the response of the field', () => {
    const nameField = new Field('name', 'Enter your name');
    nameField.fill('sneha');
    assert.deepEqual(nameField.getResponse(), 'sneha');
  });

  it('should return the response of a field', () => {
    const nameField = new Field('name', 'Enter your name');
    nameField.fill('sneha');
    assert.deepEqual(nameField.getResponse(), 'sneha');
  });

  it('should return entry of a field', () => {
    const nameField = new Field('name', 'Enter your name');
    nameField.fill('sneha');
    const expected = { name: 'name', response: 'sneha' };
    assert.deepEqual(nameField.getEntry(), expected);
  });

  it('should return true when field is filled', () => {
    const nameField = new Field('name', 'Enter your name');
    nameField.fill('sneha');
    assert.equal(nameField.isFieldFilled(), true);
  });

  it('should return false when field is unfilled', () => {
    const nameField = new Field('name', 'Enter your name');
    assert.equal(nameField.isFieldFilled(), false);
  });

  it('should parse the given response', () => {
    const capitalize = str => str.toUpperCase();
    const abc = x => x;
    const nameField = new Field('name', 'Enter your name', abc, capitalize);
    assert.equal(nameField.parse('sneha'), 'SNEHA');
  });

  it('should return true for valid response', () => {
    const isFiveDigits = str => str.length === 5;
    const abc = x => x;
    const nameField = new Field('name', 'Enter your name', isFiveDigits, abc);
    assert.equal(nameField.isValid('sneha'), true);
  });

  it('should return false for invalid response', () => {
    const isFiveDigits = str => str.length === 5;
    const abc = x => x;
    const nameField = new Field('name', 'Enter your name', isFiveDigits, abc);
    assert.equal(nameField.isValid('snehal'), false);
  });
});
