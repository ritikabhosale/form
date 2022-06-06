class Name {
  #name;
  constructor(name) {
    this.#name = name;
  }
  validate(name) {
    return /^[a-z]*$/.test(name) && name.length > 4;
  }
  question() {
    return 'Please enter your name:';
  }
  set(name) {
    this.#name = name;
  }
  fieldName() {
    return 'name';
  }
  getValue() {
    return this.#name;
  }
}
exports.Name = Name;
