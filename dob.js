class Dob {
  #dob;
  constructor(dob) {
    this.#dob = dob;
  }
  validate(dob) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dob);
  }
  question() {
    return 'Please enter your dob:';
  }
  set(dob) {
    this.#dob = dob;
  }
  fieldName() {
    return 'dob';
  }
  getValue() {
    return this.#dob;
  }
}
exports.Dob = Dob;
