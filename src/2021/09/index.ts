function getNeighbours(x: number, y: number, rows:number[][]): any[] {
  const maxX = rows[0].length - 1
  const maxY = rows.length - 1
  const neighbours = []

  if (x > 0) {
    neighbours.push({value: rows[y][x - 1], x: x - 1, y})
  }
  if (x < maxX) {
    neighbours.push({value: rows[y][x + 1], x: x + 1, y})
  }

  if (y > 0) { 
    neighbours.push({value: rows[y - 1][x], x, y: y - 1})
  }
  if (y < maxY) {
    neighbours.push({value: rows[y + 1][x], x, y: y + 1})
  }

  return neighbours
}

async function taskA (input: string): Promise<any> {
  const rows = input.split('\n').map(row => row.split('').map(c => +c))
  let riskLevel = 0
  for (let y = 0; y < rows.length; y++) {
    for(let x = 0; x < rows[y].length; x++) {
      const currentHeight = rows[y][x]
      const neighbours = getNeighbours(x, y, rows)
      if (neighbours.filter(n => currentHeight >= n ).length === 0) {
        riskLevel += currentHeight + 1
      }
    }
  }
  return riskLevel
}

const alreadySearched: any = {}

function buildBasin(cX: number, cY: number, rows: number[][], basin: any[]) {
  // console.log('in:', cX, cY)
  if (alreadySearched[cX + '-' + cY]) {
    // console.log('already searched', cX, cY)
    return
  }

  // console.log('adding', cX, cY, rows[cY][cX])
  basin.push(rows[cY][cX])

  const neighbours = getNeighbours(cX, cY, rows)
  alreadySearched[cX + '-' + cY] = true
  // console.log('ready to build', cX, cY, neighbours)
  for (const neighbour of neighbours) {
    if (neighbour.value === 9) {
      // Edge, stop looking in this direction
      continue;
    }
    buildBasin(neighbour.x, neighbour.y, rows, basin)
  }
}

async function taskB (input: string): Promise<any> {
  const rows = input.split('\n').map(row => row.split('').map(c => +c))
  const lowpoints = []
  for (let y = 0; y < rows.length; y++) {
    for(let x = 0; x < rows[y].length; x++) {
      const currentHeight = rows[y][x]
      const neighbours = getNeighbours(x, y, rows)
      if (neighbours.filter(n => currentHeight >= n.value ).length === 0) {
        lowpoints.push({ value: currentHeight, x, y })
      }
    }
  }

  const basinLengths = []
  for (const lowpoint of lowpoints) {
    const { x, y, value } = lowpoint
    // console.log(x, y, value)
    // for every neighbour, check their neighbours and see if they are either an edge or a 9
    const basin: any = []
    buildBasin(x, y, rows, basin)
    // console.log('basin', basin, basin.length, '\n\n')
    basinLengths.push(basin.length)
  }

  return basinLengths.sort((a, b) => a - b).slice(-3).reduce((a, b) => a * b)
}

export { taskA, taskB }
