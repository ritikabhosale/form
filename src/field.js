class Field {
  #name;
  #prompt;
  #response;
  constructor(name, prompt) {
    this.#name = name;
    this.#prompt = prompt;
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
  equals(otherField) {
    return otherField instanceof Field &&
      this.#name === otherField.#name &&
      this.#prompt === otherField.#prompt;
  }
}

module.exports = { Field };
