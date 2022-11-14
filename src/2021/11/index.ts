function increaseAndFlash(
  grid: any,
  x: number,
  y: number,
  flashCounter: any
): void {
  // Check if this coordinate is in bounds
  if (grid[y] === undefined) {
    // console.log("Out of bounds", x, y, grid.length);
  }
  if (y < 0 || y > grid.length - 1 || x < 0 || x > grid[y].length - 1) {
    return;
  }
  grid[y][x]++;
  if (grid[y][x] === 10) {
    // console.log("Flash", x, y);
    flashCounter.count++;
    increaseAndFlash(grid, x - 1, y - 1, flashCounter);
    increaseAndFlash(grid, x, y - 1, flashCounter);
    increaseAndFlash(grid, x + 1, y - 1, flashCounter);
    increaseAndFlash(grid, x - 1, y, flashCounter);
    increaseAndFlash(grid, x + 1, y, flashCounter);
    increaseAndFlash(grid, x - 1, y + 1, flashCounter);
    increaseAndFlash(grid, x, y + 1, flashCounter);
    increaseAndFlash(grid, x + 1, y + 1, flashCounter);
  }
}

async function taskA(input: string): Promise<any> {
  const grid = input.split("\n").map((line) => line.split("").map((c) => +c));

  const height = grid.length;
  const width = grid[0].length;
  let steps = 100;
  const flashCounter = {
    count: 0,
  };
  for (let i = 0; i < steps; i++) {
    console.log("Step", i);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // For each step we need to increase all inputs by 1, if that input is heigher than 9 we must trigger a flash
        increaseAndFlash(grid, x, y, flashCounter);
      }
    }
    // console.log("öen", height, width);

    // Loop over all inputs, if they are higher than 9 set to 0
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] > 9) {
          grid[y][x] = 0;
        }
      }
    }
    // console.log(grid.flatMap((line) => line.map((c) => c.toString()).join("")));
  }

  return flashCounter;
}

async function taskB(input: string): Promise<any> {
  const grid = input.split("\n").map((line) => line.split("").map((c) => +c));

  const height = grid.length;
  const width = grid[0].length;
  let steps = 1000;
  const flashCounter = {
    count: 0,
  };
  for (let i = 0; i < steps; i++) {
    console.log("Step", i);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // For each step we need to increase all inputs by 1, if that input is heigher than 9 we must trigger a flash
        increaseAndFlash(grid, x, y, flashCounter);
      }
    }
    // console.log("öen", height, width);

    // Loop over all inputs, if they are higher than 9 set to 0
    let numFlashses = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] > 9) {
          grid[y][x] = 0;
          numFlashses++;
        }
      }
    }

    if (numFlashses === height * width) {
      return i + 1;
    }
    // console.log(grid.flatMap((line) => line.map((c) => c.toString()).join("")));
  }

  return flashCounter;
}

export { taskA, taskB };
