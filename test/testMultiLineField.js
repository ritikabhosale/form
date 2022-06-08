const assert = require('assert');
const { MultiLineField } = require("../src/multiLineField");

describe('MultiLineField', () => {
  it('should check the equality of two multiline fields', () => {
    const address1 = new MultiLineField('address', ['line1', 'line2']);
    const address2 = new MultiLineField('address', ['line1', 'line2']);
    assert.ok(address1.equals(address2));
  });
});