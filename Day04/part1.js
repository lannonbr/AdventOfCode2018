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

/** part 1 - find sleepiest guard */

let sleepiestGuard = {};

// Find sleepiest guard (sleeps for the most hours)
let maxSleep = 0;
let maxSleepId = "";
for (let id in guards) {
  if (guards[id].totalTimeAsleep > maxSleep) {
    maxSleep = guards[id].totalTimeAsleep;
    maxSleepId = id;
  }
}

sleepiestGuard = guards[maxSleepId];

// Create an array to see what minute the guard sleeps the most
const minuteArr = Array(60).fill(0);
sleepiestGuard.blocks.forEach(block => {
  for (let i = block[0]; i < block[1]; i++) {
    minuteArr[i]++;
  }
});

let maxMin = minuteArr.indexOf(Math.max(...minuteArr));

console.log("Result:", maxMin * sleepiestGuard.id);
