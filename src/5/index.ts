function calculateIntersections(input: string, filter: Function) {
  return input.split('\n').map(row => row.split(' -> ').map(pointString => pointString.split(',')
  .map(digitString => +digitString)))
  .filter(row => filter(row[0][0], row[0][1], row[1][0], row[1][1]))
  .reduce((acc, current) => {
    const isDiagonal = current[0][0] !== current[1][0] && current[0][1] !== current[1][1]
    const startX = Math.min(current[0][0], current[1][0])
    const endX = Math.max(current[0][0], current[1][0])
    let startY = Math.min(current[0][1], current[1][1])
    let endY = Math.max(current[0][1], current[1][1])
    let yIncremental = true

    // If we have a diagonal line between points we need to use the correct Y value to the start X value, we also need to know if Y increases or decreases.
    if (isDiagonal) {
      if( current[0][0] < current[1][0]) {
        startY = current[0][1]
        endY = current[1][1]
      } else {
        startY = current[1][1]
        endY = current[0][1]
      }
      if (startY > endY) {
        yIncremental = false
      }
    }

    let offset = 0

    for (let i = startX; i <= endX; ++i) {
      if (!acc[i]) {
        acc[i] = {}
      }

      // Multi directional loop, pretty baller :D 
      let j = startY + ((yIncremental ? 1 : -1) * offset)
      while(j !== endY + ((yIncremental ? 1 : -1) * 1)) {
        if (!acc[i][j]) {
          acc[i][j] = 0
        }
        acc[i][j]++
        j = j + (yIncremental ? 1 : -1)

        if (isDiagonal) {
          offset++
          break;
        }
      }
    }
    return acc
  }, {} as any)
}

function getNumPointsWithNumIntersections(intersections: any, filterNum: number) {
  return Object.entries(intersections).flatMap(row => {
    return Object.values(row[1])
  }).filter(digit => digit >= filterNum).length
}

async function taskA (input: string): Promise<any> {
  const intersections = calculateIntersections(input, (aX: number, aY: number, bX: number, bY: number) => aX === bX || aY === bY)
  return getNumPointsWithNumIntersections(intersections, 2)
}

async function taskB (input: string): Promise<any> {
  const intersections = calculateIntersections(input, () => true)
  // console.log(intersections)
  return getNumPointsWithNumIntersections(intersections, 2)
}

export { taskA, taskB }
