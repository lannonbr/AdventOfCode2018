const fs = require("fs");

let input = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n");

let twoCount = 0;
let threeCount = 0;

input.forEach(entry => {
  let [two, three] = compute(entry);

  twoCount += two;
  threeCount += three;
});

console.log("Checksum:", twoCount * threeCount);

/**
 * Returns [1,1] if it contains both at least one set of two and 1 set of three.
 * @param {String} str
 */
function compute(str) {
  let m = new Map();
  str.split("").forEach(char => {
    m.get(char) !== undefined ? m.set(char, m.get(char) + 1) : m.set(char, 1);
  });

  let twos = Array.from(m.values()).filter(item => item === 2);
  let threes = Array.from(m.values()).filter(item => item === 3);

  return [twos.length > 0 ? 1 : 0, threes.length > 0 ? 1 : 0];
}
