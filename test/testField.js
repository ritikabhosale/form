const { Field } = require("../src/field");
const assert = require('assert');

describe('Field', () => {
  it('should check the equality of two fields', () => {
    const nameField1 = new Field('name', 'Enter your name');
    const nameField2 = new Field('name', 'Enter your name');
    assert.ok(nameField1.equals(nameField2));
  });
});