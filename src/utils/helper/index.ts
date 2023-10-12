export const checkSpecialCharacter = (value: string) => {
  const invalidCharacters = /^[^~!@#$%^&*()_+|{}“:?><[\]\\;’,.\/=-]+$/;
  return invalidCharacters.test(value);
};

export const checkValidNumber = (value: string) => {
  return /^\+?\d+$/.test(value);
};
