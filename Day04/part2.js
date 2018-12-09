const fs = require("fs");

// I passed input.txt through the `sort` unix command before pushing it through here
let entries = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n");

let currentGuardId;
let sleepChunks = [];
let i = -1;
let guards = {};

entries.forEach(entry => {
  let [time, info] = entry.split("]");
  time = time.split("[")[1];
  info = info
    .split(" ")
    .slice(1)
    .join(" ");

  switch (info.split(" ")[0]) {
    case "Guard": {
      // Create a guard object
      currentGuardId = info.split(" ")[1].slice(1);
      if (guards[currentGuardId] === undefined)
        guards[currentGuardId] = {
          blocks: [],
          totalTimeAsleep: 0,
          id: currentGuardId
        };
      break;
    }
    case "falls": {
      // Push the sleep chunk
      sleepChunks.push({ id: currentGuardId, start: time, end: null });
      i++;
      break;
    }
    case "wakes": {
      // Finish up the sleep chunk
      sleepChunks[i].end = time;
      break;
    }
  }
});

// Get startMin and endMin of each chunk
sleepChunks.forEach(chunk => {
  let startTimeArr = chunk.start.split(" ");
  let minute = startTimeArr[1].split(":")[1];
  chunk.startMin = +minute;

  let endTimeArr = chunk.end.split(" ");
  minute = endTimeArr[1].split(":")[1];
  chunk.endMin = +minute;
});

// Split all of the chunks to each guard
sleepChunks.forEach(chunk => {
  let diff = chunk.endMin - chunk.startMin;
  guards[chunk.id].totalTimeAsleep += diff;
  guards[chunk.id].blocks.push([chunk.startMin, chunk.endMin]);
});

/** Part 2 - find guard which sleeps the most at a single minute */

// Setup minute array
const minuteArr = Array(60);

for (let i = 0; i < 60; i++) {
  minuteArr[i] = {};
}

// For each guard, set the minute array elements to the counts they are asleeep
for (let guardId in guards) {
  let currGuard = guards[guardId];

  currGuard.blocks.forEach(block => {
    for (let i = block[0]; i < block[1]; i++) {
      if (minuteArr[i][currGuard.id] === undefined) {
        minuteArr[i][currGuard.id] = 1;
      } else {
        minuteArr[i][currGuard.id]++;
      }
    }
  });
}

// Find the max id for each minute
for (let min = 0; min < 60; min++) {
  let currMin = minuteArr[min];
  let maxId = -1;
  let maxCount = 0;
  for (let id in currMin) {
    if (currMin[id] > maxCount) {
      maxId = id;
      maxCount = currMin[id];
    }
  }

  minuteArr[min] = [maxId, maxCount, min];
}

// Sort them and get the top minute and id
minuteArr.sort((a, b) => {
  return b[1] - a[1];
});

let [topId, _, topMin] = minuteArr[0];

console.log("Result:", topId * topMin);
