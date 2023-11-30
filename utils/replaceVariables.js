const variableRe = new RegExp("<@[a-zA-Z0-9]*@>");

/**
 * Replaces variables in a string with corresponding values from the provided data object.
 *
 * @param {string} string - The input string containing variables to be replaced.
 * @param {Object} data - The data object containing variable-value pairs.
 * @returns {string} - The string with variables replaced by their values.
 */
module.exports.replaceVariables = replaceVariables;
function replaceVariables(string, data = {}) {
  const match = string.match(variableRe);
  if (!match) return string;
  const varName = match[0].slice(2).slice(0, -2);
  if (!data[varName])
    return replaceVariables(
      string.replace(`<@${varName}@>`, `<@!${varName}!@>`),
      data,
    );
  else
    return replaceVariables(
      string.replace(`<@${varName}@>`, data[varName]),
      data,
    );
}
