module.exports = function check(str, bracketsConfig) {
  const brackets = [...bracketsConfig];
  const sameBrackets = {};
  let stack = [];
  let opening = [];
  let closing = {};
  brackets.forEach((pair) => {
    opening.push(pair[0]);
    closing[pair[1]] = pair[0];
    if (pair[1] === pair[0]) {
      sameBrackets[pair[0]] = true;
    }
  });
  for (let char of str) {
    if (sameBrackets[char]) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (opening.includes(char)) {
      stack.push(char);
    } else if (closing[char]) {
      if (stack.length === 0 || stack[stack.length - 1] !== closing[char]) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
};
