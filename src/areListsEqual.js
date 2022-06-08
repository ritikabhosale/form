const areListsEqual = (list1, list2) => {
  if (list1.length != list2.length) {
    return false;
  }

  for (let index = 0; index < list1.length; index++) {
    if (list1[index] != list2[index]) {
      return false;
    }
  }
  return true;
};

module.exports = { areListsEqual };
