class Hobbies {
  #hobbies;
  constructor(hobbies) {
    this.#hobbies = hobbies;
  }
  validate(hobbies) {
    return hobbies.length > 0;
  }
  question() {
    return 'Please enter your hobbies:';
  }
  set(hobbies) {
    this.#hobbies = hobbies.split(',');
  }
  fieldName() {
    return 'hobbies';
  }
  getValue() {
    return this.#hobbies;
  }
}
exports.Hobbies = Hobbies;
