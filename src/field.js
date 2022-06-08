class Field {
  #name;
  #prompt;
  #response;
  #validator;
  #parser;
  constructor(name, prompt, validator = _ => true, parser = x => x) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#response = null;
    this.#parser = parser;
  }

  getPrompt() {
    return this.#prompt;
  }

  fill(response) {
    this.#response = response;
  }

  getResponse() {
    return this.#response;
  }

  getEntry() {
    return { name: this.#name, response: this.#response };
  }

  isValid(response) {
    return this.#validator(response);
  }

  parse(response) {
    return this.#parser(response);
  }

  isFieldFilled() {
    return this.#response;
  }

  equals(otherField) {
    return otherField instanceof Field &&
      this.#name === otherField.#name &&
      this.#prompt === otherField.#prompt;
  }
}

module.exports = { Field };
