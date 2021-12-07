async function taskA (input: string): Promise<any> {
  const positions = input.split(',').map(Number).sort((a, b) => a - b)
  let best = Infinity
  for(let i = positions[0]; i <= positions[positions.length - 1]; i++) {
    best = Math.min(best, positions.reduce((acc, curr) => acc + Math.abs(curr - i), 0))
  }
  return best
}

async function taskB (input: string): Promise<any> {
  const positions = input.split(',').map(Number).sort((a, b) => a - b)
  let best = Infinity
  for(let i = positions[0]; i <= positions[positions.length - 1]; i++) {
    best = Math.min(best, positions.reduce((acc, curr) => {
      const distance = Math.abs(curr - i)
      let cost = 0
      for (let j = 1; j < distance + 1; j++) {
        cost += j
      }
      return acc + cost
    }, 0))
  }
  return best
}

export { taskA, taskB }
