class Field {
  #name;
  #prompt;
  #response;
  #validator;
  constructor(name, prompt, validator = _ => true) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#response = null;
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

  equals(otherField) {
    return otherField instanceof Field &&
      this.#name === otherField.#name &&
      this.#prompt === otherField.#prompt;
  }
}

module.exports = { Field };
