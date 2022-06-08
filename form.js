class Form {
  #fields;
  #currentFieldIndex;
  constructor(...fields) {
    this.#fields = fields;
    this.#currentFieldIndex = 0;
  }
  currentFieldPrompt() {
    return this.#fields[this.#currentFieldIndex].getPrompt();
  }
  fillField(response) {
    this.#fields[this.#currentFieldIndex].fill(response);
    this.#currentFieldIndex++;
  }
  isFilled() {
    return this.#fields.every(field => field.getResponse());
  }
}
exports.Form = Form;
