class PhoneNo {
  #phoneNo;
  constructor(phoneNo) {
    this.#phoneNo = phoneNo;
  }
  validate(phoneNo) {
    return /^\d{10}$/.test(phoneNo);
  }
  question() {
    return 'Please enter your Phone No.:';
  }
  set(phoneNo) {
    this.#phoneNo = phoneNo;
  }
  fieldName() {
    return 'phoneNo';
  }
  getValue() {
    return this.#phoneNo;
  }
}
exports.PhoneNo = PhoneNo;
