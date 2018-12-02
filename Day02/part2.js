const fs = require("fs");

let input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n");

// Wished I didn't need to use a n^2 algorithm, but it works.
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    if (i !== j) {
      if (characterDiffExactlyOne(input[i], input[j])) {
        console.log("Strings:", input[i], input[j]);
        return;
      }
    }
  }
}

/**
 * Iterate through two strings and return the boolean result of if the diff between
 * the two strings is exactly one.
 * @param {String} first
 * @param {String} second
 */
function characterDiffExactlyOne(first, second) {
  let diffs = 0;
  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) {
      diffs++;
    }

    if (diffs > 1) {
      return false;
    }
  }

  return true;
}
