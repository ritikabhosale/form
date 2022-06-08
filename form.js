class Form {
  #fields;
  #currentFieldIndex;
  constructor(...fields) {
    this.#fields = fields;
    this.#currentFieldIndex = 0;
  }

  currentField() {
    return this.#fields[this.#currentFieldIndex];
  }

  currentFieldPrompt() {
    return this.currentField().getPrompt();
  }

  fillField(response) {
    if (!this.#validate(response)) {
      throw new Error('Invalid Input');
    }
    this.currentField().fill(response);
    this.#currentFieldIndex++;
  }

  isFilled() {
    return this.#fields.every(field => field.getResponse());
  }

  #validate(response) {
    return this.currentField().isValid(response);
  }

  getResponses() {
    const responses = {};
    this.#fields.forEach(field => {
      const { name, response } = field.getEntry();
      responses[name] = response;
    });
    return responses;
  }
}

module.exports = { Form };
