const { areListsEqual } = require("./areListsEqual");

class MultiLineField {
  #name;
  #prompts;
  #responses;
  #validator;
  #parser;
  #currentFieldIndex;
  constructor(name, prompt, validator = _ => true, parser = x => x) {
    this.#name = name;
    this.#prompts = prompt;
    this.#validator = validator;
    this.#responses = [];
    this.#parser = parser;
    this.#currentFieldIndex = 0;
  }

  getPrompt() {
    return this.#prompts[this.#currentFieldIndex];
  }

  fill(response) {
    this.#responses.push(response);
    this.#currentFieldIndex++;
  }

  getResponse() {
    return this.#responses[this.#currentFieldIndex];
  }

  getEntry() {
    return { name: this.#name, response: this.#responses };
  }

  isValid(response) {
    return this.#validator(response);
  }

  parse(responses) {
    return this.#parser(responses);
  }

  isFieldFilled() {
    return this.#prompts.length === this.#responses.length;
  }

  equals(otherField) {
    return otherField instanceof MultiLineField &&
      otherField.#name == this.#name &&
      areListsEqual(otherField.#prompts, this.#prompts);
  }
}

module.exports = { MultiLineField };
