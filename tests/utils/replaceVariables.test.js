const { replaceVariables } = require('../../utils/replaceVariables');

describe('replaceVariables', () => {
  it('should replace a variable in the string', () => {
    const inputString = 'Hello <@name@>!';
    const data = { name: 'John' };
    const expectedOutput = 'Hello John!';
    expect(replaceVariables(inputString, data)).toEqual(expectedOutput);
  });

  it('should handle multiple variables in the string', () => {
    const inputString = 'My name is <@name@> and I am <@age@> years old.';
    const data = { name: 'Alice', age: 25 };
    const expectedOutput = 'My name is Alice and I am 25 years old.';
    expect(replaceVariables(inputString, data)).toEqual(expectedOutput);
  });

  it('should handle variables with special characters', () => {
    const inputString = 'This is a test for <@user@> with special characters!';
    const data = { user: 'test_user_123' };
    const expectedOutput = 'This is a test for test_user_123 with special characters!';
    expect(replaceVariables(inputString, data)).toEqual(expectedOutput);
  });

  it('should handle missing variables by replacing them with placeholders', () => {
    const inputString = 'This variable is missing: <@missingVar@>';
    const data = { existingVar: 'I exist!' };
    const expectedOutput = 'This variable is missing: <@!missingVar!@>';
    expect(replaceVariables(inputString, data)).toEqual(expectedOutput);
  });

  it('should handle recursive replacements', () => {
    const inputString = 'Replace <@var1@> and <@var2@>';
    const data = { var1: '<@var2@>', var2: 'nested replacement' };
    const expectedOutput = 'Replace nested replacement and nested replacement';
    expect(replaceVariables(inputString, data)).toEqual(expectedOutput);
  });

  it('should handle an empty string', () => {
    const inputString = '';
    const data = { name: 'John' };
    const expectedOutput = '';
    expect(replaceVariables(inputString, data)).toEqual(expectedOutput);
  });

  it('should handle undefined data', () => {
    const inputString = 'Hello <@name@>!';
    const expectedOutput = 'Hello <@!name!@>!';
    expect(replaceVariables(inputString)).toEqual(expectedOutput);
  });
});
