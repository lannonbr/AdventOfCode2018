const fs = require("fs");

let input = fs.readFileSync("input.txt");
let frequencyChanges = input
  .toString() // Change buffer to string
  .split("\n") // Split on newlines
  .map(int => +int); // convert to ints

// Reduce the array to a single number starting with 0
let finalFreq = frequencyChanges.reduce((prev, current) => prev + current, 0);

console.log("Final Frequency: ", finalFreq);
