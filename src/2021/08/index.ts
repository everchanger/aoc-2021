async function taskA (input: string): Promise<any> {
  const uniqueLengths = [2, 3, 4, 7]
  return input.split('\n')
  .flatMap(row => row.split(' | ')[1].split((' ')))
  .reduce((acc: any, curr: any) => acc + uniqueLengths.includes(curr.length), 0)
}

function findUnknownCharacter(a: string, b: string): string {
  for (let i = 0; i < b.length; i++) {
    if (a.indexOf(b[i]) === -1) {
      return b[i]
    }
  }
  return ''
}

function decode(input: string, chiffer: any): number {
  const display:any = {
    'abcefg': 0,
    'cf': 1,
    'acdeg': 2,
    'acdfg': 3,
    'bcdf': 4,
    'abdfg': 5,
    'abdefg': 6,
    'acf': 7,
    'abcdefg': 8,
    'abcdfg': 9,
  }

  // sort the input string in alphabetical order
  const sortedInput = input.split('').map(c => chiffer[c]).sort().join('')
  return display[sortedInput]
}

async function taskB (input: string): Promise<any> {
  const rows = input.split('\n')
  .map(row => row.split(' | ').map(entry => entry.split(' ')))

  let total = 0
  for (const row of rows) {
    const segments = row[0]
    const output = row[1]

    const uniqueLookup: any = {
      2: 1, // c f  => 0, 3, 9
      3: 7, // a c f  => 0, 3, 9
      4: 4, // b c d f  => 9
      7: 8, // a b c d e f g => -
    }

    const segmentKey: any = {
      a: undefined,
      b: undefined,
      c: undefined, // There are only two numbers where c is missing 5 and 6
      d: undefined,
      e: undefined,
      f: undefined, // Will only be missing on 2
      g: undefined,
    }
    const translationKeys:any = {}

    for (const segment of segments) { 
      if (uniqueLookup[segment.length] !== undefined) {
        translationKeys[segment.length] = segment
      }
    }

    // Need to sort the keys here

    const one = translationKeys[2].split('').sort().join('')
    const seven = translationKeys[3].split('').sort().join('')
    const a = findUnknownCharacter(one, seven)
    segmentKey['a'] = a;

    // We know that 4 and 9 share the same digits, since we know 4 we know 9!
    const four = translationKeys[4]
    let nine = ''
    for (const segment of segments) {
      if (segment.length === 7 || segment === four) {
        // This either eight or four
        continue;
      }

      let found = true
      for (let i = 0; i < four.length; i++) {
        if (segment.indexOf(four[i]) === -1) {
          found = false
          break;
        }
      }
      if (found) {
        nine = segment
        break;
      }
    }

    // 9 contains: a b c d f g, all characters except e, since we have 8 that has all characters we now know e!
    const eight = translationKeys[7]
    const e = findUnknownCharacter(nine, eight)

    segmentKey['e'] = e;

    // Since we know 9 we should be able to figure out 3, b is the only thing missing from 9, we know both have c and f
    for (const segment of segments) {
      if (segment.length !== 5) {
        // 3 has 5 characters
        continue;
      }
      let count = 0
      let index = -1
      for(let i = 0; i < nine.length; i++) {
        if (segment.indexOf(nine[i]) === -1) {
          count++
          index = i
        }
      }
      if (count === 1) {
        // Check if we have both c and f
        let oneCount = 0
        for (let i = 0; i < one.length; i++) {
          if (segment.indexOf(one[i]) !== -1) {
            oneCount++
          }
        }
        if (oneCount === 2) {
          segmentKey['b'] = nine[index]
          break;
        }
      }
    }


    // We know that f will be missing from the character 2, we know that f is one of two in 1
    for (let i = 0; i < one.length; i++) {
      let count = 0
      for (const segment of segments) {
        if (segment.indexOf(one[i]) === -1) {
          count++
        }
      }
      if (count === 1) {
        // This is f
        segmentKey['f'] = one[i]
      } else {
        // This is c
        segmentKey['c'] = one[i]
      }
    }

    // We know that 1, 4 and 7 all are missing g and e, since we know e we know g
    const res = [...new Set([translationKeys[2], translationKeys[3], translationKeys[4]].join(''))]
    // Add e to have all the characters except g
    res.push(segmentKey['e'])
    segmentKey['g'] = findUnknownCharacter(res.join(''), eight)

    // Find d, the last missing character!
    const knownValues = Object.values(segmentKey).filter(val => val !== undefined)
    segmentKey['d'] = findUnknownCharacter(knownValues.join(''), eight)

    // Reverse the segmentKey to get the chiffer
    const chiffer: any = {}
    for (const [key, value] of Object.entries(segmentKey)) {
      chiffer[value as string] = key
    }

    let decodedNumber = ''
    for (const scramble of output) {
      decodedNumber += decode(scramble, chiffer)
    }

    total += parseInt(decodedNumber)
  }

  return total
}

export { taskA, taskB }
