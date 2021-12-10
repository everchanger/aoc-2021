async function taskA (input: string): Promise<any> {
  const rows = input.split('\n')
  const chunkDelimiters = ['(', '[', '{', '<']
  const chunkEndDelimiters = [')', ']', '}', '>']
  const scoring: any = {')': 3, ']': 57, '}': 1197, '>': 25137}

  const startedChunks = []
  const syntaxErrors = []

  for (const row of rows) {
    const charRow = row.split('')
    for (let i = 0; i < charRow.length; i++) {
      const char = charRow[i]
      const delimiterIndex = chunkDelimiters.indexOf(char)
      if (delimiterIndex !== -1) {
        startedChunks.push(delimiterIndex)
      } else {
        // We bumped into an end char, this should be a match to the last entry of startedChunks
        const endDelimiter = chunkEndDelimiters[startedChunks.pop()]
        if (char !== endDelimiter) {
          syntaxErrors.push(char)
          break;
        }
      }
    }
  }

  return syntaxErrors.reduce((acc, curr) => acc + scoring[curr], 0)
}

async function taskB (input: string): Promise<any> {
  const rows = input.split('\n')
  const chunkDelimiters = ['(', '[', '{', '<']
  const chunkEndDelimiters = [')', ']', '}', '>']
  const scoring: any = {')': 1, ']': 2, '}': 3, '>': 4}
  const scores = []

  // Get corrupt lines
  for (const row of rows) {
    const startedChunks = []
    const charRow = row.split('')
    let corrupted = false
    for (let i = 0; i < charRow.length; i++) {
      const char = charRow[i]
      const delimiterIndex = chunkDelimiters.indexOf(char)
      if (delimiterIndex !== -1) {
        startedChunks.push(delimiterIndex)
      } else {
        // We bumped into an end char, this should be a match to the last entry of startedChunks
        const endDelimiter = chunkEndDelimiters[startedChunks.pop()]
        if (char !== endDelimiter) {
          corrupted = true
          break
        }
      }
    }
    if (corrupted) {
      continue
    }

    // Invalid line, 
    startedChunks.reverse()
    scores.push(startedChunks.map(i => chunkEndDelimiters[i]).reduce((acc, curr) => acc * 5 + scoring[curr], 0))
  }

  scores.sort((a, b) => a - b)
  return scores[Math.floor(scores.length / 2)]
}

export { taskA, taskB }
