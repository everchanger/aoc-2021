async function taskA (input: string): Promise<number> {
  let count = 0
  input.split('\n').reduce((previous: number | undefined, line) => {
    count += +(previous < +line)
    return +line
  }, undefined)
  return count
}

async function taskB (input: string): Promise<number> {
  const windowSize = 3
  const frames = []

  let count = 0
  let frameOffset = 0
  for (const line of input.split('\n')) {
    frames.push({
      count: 0,
      value: 0,
    })
    for (let i = frameOffset; i < frames.length; ++i) {
      const frame = frames[i]
      frame.value += +line
      frame.count++

      if (frame.count === windowSize) {
        count += +(frameOffset && frame.value > frames[i - 1].value)
        frameOffset++
      }
    }   
  }

  return count
}

export { taskA, taskB }
