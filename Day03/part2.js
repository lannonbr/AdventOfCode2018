const fs = require("fs");
const { checkForIntersection, parseClaim } = require("./lib");

let claims = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n");

claims = claims.map(parseClaim);

let intersectionIds = Array(claims.length + 1);

for (let i = 0; i < claims.length; i++) {
  for (let j = 0; j < claims.length; j++) {
    if (i !== j) {
      let [intersect] = checkForIntersection(claims[i], claims[j]);

      if (intersect) {
        // Mark i and j
        intersectionIds[+claims[i].id.split("#")[1]] = 1;
        intersectionIds[+claims[j].id.split("#")[1]] = 1;
      }
    }
  }
}

// Find the one item that wasn't marked
let nonOverlappedClaimId = intersectionIds.slice(1).findIndex(a => a !== 1) + 1;

console.log({ nonOverlappedClaimId });
