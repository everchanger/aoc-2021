

async function taskA (input: string): Promise<any> {
  const data = input.split('\n')
  const directions = {
    'forward': 1,
    'down': 1,
    'up': -1,
  }

  let depth = 0
  let horizontal = 0
  for (const entry of data) {

    for (const [direction, multiplier] of Object.entries(directions)) {
      if(!entry.startsWith(direction)) continue
       
      const value = +entry.substr(direction.length + 1) * multiplier
      if (direction === 'forward') {
        horizontal += value
      } else {
        depth += value
      }
    }
  }

  return depth * horizontal
}

async function taskB (input: string): Promise<any> {
  const data = input.split('\n')
  const directions = {
    'forward': 1,
    'down': 1,
    'up': -1,
  }

  let aim = 0
  let depth = 0
  let horizontal = 0
  for (const entry of data) {

    for (const [direction, multiplier] of Object.entries(directions)) {
      if(!entry.startsWith(direction)) continue
       
      const value = +entry.substr(direction.length + 1) * multiplier
      if (direction === 'forward') {
        horizontal += value
        depth += aim * value
      } else {
        aim += value
      }
    }
  }

  return depth * horizontal
}

export { taskA, taskB }
