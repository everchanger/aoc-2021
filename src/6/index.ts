function simulateCycles(input: string, days: number): string {
  let fishes = input
  for (let i = 0; i < days; i++) {
    let nextGeneration = ''
    let countNewFishes = 0
    for (let j = 0; j < fishes.length; j += 2) {
      let fishAge = +fishes[j] - 1
      if (fishAge === -1) {
        countNewFishes++
        fishAge = 6
      }
      nextGeneration += `${nextGeneration ? ',' : ''}${fishAge}`  
    }
    // Add a eight for every countNewFishes to the end of nextGeneration
    if (countNewFishes) {
      nextGeneration += `,8`.repeat(countNewFishes)
    }
     
    fishes = nextGeneration
  }
  return fishes
}



function smartSimulateCycles(input: string, days: number): number {
  const fishes = input.split(',').map(x => +x)
  let ages: any = {}
  for (let i = 0; i < 9; i++) {
    ages[i] = 0
    fishes.forEach(fish => ages[i] += fish === i ? 1 : 0)
  }

  for (let i = 0; i < days; i++) {
    const newAges: any = {
      '7': 0,
      '8': 0,
    }
    for (let j = 8; j >= 0; j--) {
      if (j === 0 && ages[j]) {
        newAges[6] += ages[j]
        newAges[8] += ages[j]
      } 
      
      if(j > 0){
        if (!newAges[j - 1]) {
          newAges[j - 1] = 0
        }
        newAges[j - 1] += ages[j] 
      }
    }
    ages = newAges
  }

  return Object.values(ages).reduce((acc: number, curr: number): number => acc + curr, 0) as number
}

async function taskA (input: string): Promise<any> {
  const fishes = simulateCycles(input, 80)
  // return the number of fish alive
  return fishes.split(',').length
}

async function taskB (input: string): Promise<any> {
  return smartSimulateCycles(input, 256)
}

export { taskA, taskB }
