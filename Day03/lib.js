// Try to find an intersection between two rectangles
const checkForIntersection = (leftRect, rightRect) => {
  let x1 = leftRect.left;
  let x2 = leftRect.right;
  let x3 = rightRect.left;
  let x4 = rightRect.right;

  let y1 = leftRect.top;
  let y2 = leftRect.bottom;
  let y3 = rightRect.top;
  let y4 = rightRect.bottom;

  function xOverlap(x1, x2, x3, x4) {
    return (x1 <= x3 && x3 <= x2) || (x3 <= x1 && x1 <= x4);
  }

  function yOverlap(y1, y2, y3, y4) {
    return (y1 <= y3 && y3 <= y2) || (y3 <= y1 && y1 <= y4);
  }

  if (xOverlap(x1, x2, x3, x4) && yOverlap(y1, y2, y3, y4)) {
    let xs = [x1, x2, x3, x4];
    let ys = [y1, y2, y3, y4];
    xs = xs.sort((a, b) => a - b);
    ys = ys.sort((a, b) => a - b);

    return [true, { left: xs[1], right: xs[2], top: ys[1], bottom: ys[2] }];
  } else {
    return [false, null];
  }
};

// Parse the claim string into an object
const parseClaim = claim => {
  let [id, _, topLeft, size] = claim.split(" ");
  let left = +topLeft.split(",")[0];
  let top = +topLeft.split(",")[1].slice(0, -1);
  let [width, height] = size.split("x").map(i => parseInt(i));
  let bottom = top + height - 1;
  let right = left + width - 1;

  return { id, left, top, bottom, right, width, height };
};

// Remove all duplicates from an array
const uniq = arr =>
  arr.filter((elem, index, self) => {
    return index == self.indexOf(elem);
  });

// Flatten an array
const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

module.exports = {
  checkForIntersection,
  parseClaim,
  uniq,
  flatten
};
