const fs = require("fs");

let input = fs.readFileSync("input.txt");
let frequencyChanges = input
  .toString() // Change buffer to string
  .split("\n") // Split on newlines
  .map(int => +int); // convert to ints

let seenFrequencies = [0];
let currentFreq = 0;

while (1) {
  // I used Array.every to prematurely exit the iteration if the condition is met since .every quits once one item returns false
  let notFound = frequencyChanges.every(change => {
    currentFreq += change;
    // If currentFreq is in the seenFrequencies already, we found the result
    if (seenFrequencies.includes(currentFreq)) {
      return false;
    }
    seenFrequencies.push(currentFreq);
    return true;
  });

  if (!notFound) break;
}

console.log("Repeated Freq:", currentFreq);
