const fs = require("fs");
const { checkForIntersection, parseClaim, uniq, flatten } = require("./lib");

let claims = fs
  .readFileSync("input.txt")
  .toString()
  .split("\n");

claims = claims.map(parseClaim);

let intersectRects = [];

// Find all of the intersection rectangles
for (let i = 0; i < claims.length; i++) {
  for (let j = 0; j < claims.length; j++) {
    if (i !== j) {
      let [intersect, rect] = checkForIntersection(claims[i], claims[j]);

      if (intersect) {
        intersectRects.push(rect);
      }
    }
  }
}

// Convert objects to strings temporarily to remove duplicates and then convert it back
// to an object with 4 keys
intersectRects = uniq(
  intersectRects.map(r => `${r.left}-${r.right}-${r.top}-${r.bottom}`)
).map(r => {
  const [rL, rR, rT, rB] = r.split("-");

  return { l: +rL, r: +rR, t: +rT, b: +rB };
});

// Get max x value needed to create grid
let xMax = Math.max(
  ...flatten(
    intersectRects.map(r => {
      return [r.l, r.r];
    })
  )
);

// Get max y value needed to create grid
let yMax = Math.max(
  ...flatten(
    intersectRects.map(r => {
      return [r.t, r.b];
    })
  )
);

let board = [...Array(xMax + 1)].map(_ => Array(yMax + 1));

// Go through intersection rectangles and mark all spaces where there were intersections
for (let i = 0; i < intersectRects.length; i++) {
  for (let x = intersectRects[i].l; x <= intersectRects[i].r; x++) {
    for (let y = intersectRects[i].t; y <= intersectRects[i].b; y++) {
      board[x][y] = 1;
    }
  }
}

const sum = (a, b) => a + b;

// Count the number of filled spaces
let filledSpaces = flatten(board).reduce(sum, 0);

console.log({ filledSpaces });
