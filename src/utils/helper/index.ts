export const checkSpecialCharacter = (value: string) => {
  const invalidCharacters = /^[^\s~!@#$%^&*()_+|{}“:?><[\]\\;’,.\/=-]+$/;
  return invalidCharacters.test(value);
};
