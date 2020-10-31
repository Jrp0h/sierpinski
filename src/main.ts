let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
let context = canvas!.getContext("2d");

// Why doesn't this exist in Math?
const GOLDEN_RATIO = 1.618033988749894;

// -1 - 1 -> 0 - 800

// +1 =
// 0 - 2
// 
// / 2
// =
// 0 - 1
//
// * 800
// = 0 - 800

// https://mae.ufl.edu/~uhk/NSIDED-POLYGONS.pdf
// I never wanna do maths again
// and why didn't i just use a unit circle...
const p1 = {
  x: ((0 + 1) / 2) * 800,
  y: ((1 + 1) / 2) * 800
};

const p2 = {
  x: (((Math.sqrt(2 + GOLDEN_RATIO) / 2) + 1) / 2) * 800,
  y: ((((GOLDEN_RATIO - 1) / 2) + 1) / 2) * 800
};

const p3 = {
  x: (((Math.sqrt(3 - GOLDEN_RATIO) / 2) + 1) / 2) * 800,
  y: (((-GOLDEN_RATIO / 2) + 1) / 2) * 800
};

const p4 = {
  x: ((-Math.sqrt(3 - GOLDEN_RATIO) / 2 + 1) / 2) * 800,
  y: (((-GOLDEN_RATIO / 2) + 1) / 2) * 800
};

const p5 = {
  x: (((-Math.sqrt(2 + GOLDEN_RATIO) / 2) + 1) / 2) * 800,
  y: ((((GOLDEN_RATIO - 1) / 2) + 1) / 2) * 800
};

const p1Triangle = {
  x: 400,
  y: 0
};

const p2Triangle = {
  x: 0,
  y: 800
};

const p3Triangle = {
  x: 800,
  y: 800
};

let currentPosition = p1;

function advanceTriangle() {
  context!.beginPath();

  let rand = Math.floor(Math.random() * 3) + 1;

  let temp: {x: number, y: number} = {x: 0, y: 0};

  if (rand == 1) {
    temp.x = currentPosition.x + ((p1Triangle.x - currentPosition.x) / 2);
    temp.y = currentPosition.y + ((p1Triangle.y - currentPosition.y) / 2);
  }
  else if (rand == 2) {
    temp.x = currentPosition.x + ((p2Triangle.x - currentPosition.x) / 2);
    temp.y = currentPosition.y + ((p2Triangle.y - currentPosition.y) / 2);
  }
  else if (rand == 3) {
    temp.x = currentPosition.x + ((p3Triangle.x - currentPosition.x) / 2);
    temp.y = currentPosition.y + ((p3Triangle.y - currentPosition.y) / 2);
  }

  // Swapped red and green
  // because rgb is more logical than grb
  let color = {
    r: ((800 - Math.sqrt(Math.pow(temp.x - p2Triangle.x, 2) + Math.pow(temp.y - p2Triangle.y, 2))) / 800) * 255,
    g: ((800 - Math.sqrt(Math.pow(temp.x - p1Triangle.x, 2) + Math.pow(temp.y - p1Triangle.y, 2))) / 800) * 255,
    b: ((800 - Math.sqrt(Math.pow(temp.x - p3Triangle.x, 2) + Math.pow(temp.y - p3Triangle.y, 2))) / 800) * 255,
  };

  currentPosition = temp;
  context!.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
  context!.arc(temp.x, temp.y, 0.05, 0, 2 * Math.PI);
  context!.stroke();
}

function advancePenta() {
  context!.beginPath();

  let rand = Math.floor(Math.random() * 5) + 1;

  let temp: {x: number, y: number} = {x: 0, y: 0};

  if (rand == 1) {
    temp.x = currentPosition.x + ((p1.x - currentPosition.x) / 2);
    temp.y = currentPosition.y + ((p1.y - currentPosition.y) / 2);
  }
  else if (rand == 2) {
    temp.x = currentPosition.x + ((p2.x - currentPosition.x) / 2);
    temp.y = currentPosition.y + ((p2.y - currentPosition.y) / 2);
  }
  else if (rand == 3) {
    temp.x = currentPosition.x + ((p3.x - currentPosition.x) / 2);
    temp.y = currentPosition.y + ((p3.y - currentPosition.y) / 2);
  }
  else if (rand == 4) {
    temp.x = currentPosition.x + ((p4.x - currentPosition.x) / 2);
    temp.y = currentPosition.y + ((p4.y - currentPosition.y) / 2);
  }
  else if (rand == 5) {
    temp.x = currentPosition.x + ((p5.x - currentPosition.x) / 2);
    temp.y = currentPosition.y + ((p5.y - currentPosition.y) / 2);
  }

  let color = {
    r: ((800 - Math.sqrt(Math.pow(temp.x - p1.x, 2) + Math.pow(temp.y - p1.y, 2))) / 800) * 255,
    g: ((800 - Math.sqrt(Math.pow(temp.x - p2.x, 2) + Math.pow(temp.y - p2.y, 2))) / 800) * 255,
    b: ((800 - Math.sqrt(Math.pow(temp.x - p3.x, 2) + Math.pow(temp.y - p3.y, 2))) / 800) * 255,
  };


  currentPosition = temp;
  context!.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
  context!.arc(temp.x, temp.y, 0.05, 0, 2 * Math.PI);
  context!.stroke();
}

setInterval(() => {
  for (let i = 0; i < 50; i++) {
    advanceTriangle();
    // advancePenta();
  }
}, 1);
