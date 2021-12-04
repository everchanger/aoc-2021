function sumOnMarked(board: any, previouslyDrawn: any) {
  let sum = 0
  for (const row of board) {
    for (const digit of row) {
      if (!previouslyDrawn.includes(digit)) {
        sum += digit
      }
    }
  }
  return sum
}

function reverseCheck(board: any[], rowIndex: any, columnIndex: any, digit: any, previouslyDrawn: number[]) {
  // Check if all of the digits in this row/column is in the previously drawn stack
  // Start with the row
  let found = true
  for (const rowDigit of board[rowIndex]) {
    if (!previouslyDrawn.includes(rowDigit)) {
      found = false
      break;
    }
  }

  if (found) {
    return sumOnMarked(board, previouslyDrawn)
  }

  // Check the column
  found = true
  for (const rowKey in board) {
    const row = board[rowKey]
    const colDigit = row[columnIndex]
    if (!previouslyDrawn.includes(colDigit)) {
      found = false
      break;
    }
  } 

  if(found) {
    return sumOnMarked(board, previouslyDrawn)
  }

  return 0
}

async function taskA (input: string): Promise<any> {
  const inputArray = input.split('\n')
  const drawer = inputArray[0].split(',').map(stringDigit => +stringDigit);
  console.log(drawer)
  const boards = []
  for (let i = 2; i < inputArray.length - 2; i += 6) {
    const board = inputArray.slice(i, i + 5).map(row => row.match(/.{1,3}/g).map(stringDigit => +stringDigit))
    boards.push(board)
  }

  const previouslyDrawn = []
  for (const drawnNumber of drawer) {
    previouslyDrawn.push(drawnNumber)
    for (const boardIndex in boards) {
      const board = boards[boardIndex]
      for (const rowIndex in board) {
        const row = board[rowIndex]
        for (const colIndex in row) {
          const digit = row[colIndex]
          if (digit === drawnNumber) {
            // Check the row and col this digit is in to see if we have a bingo
            const sum = reverseCheck(board, rowIndex, colIndex, digit, previouslyDrawn)
            if (sum) {
              console.log('solution found!', sum, board, rowIndex, colIndex)
              return sum * drawnNumber
            }
          }
        }
      }
    }
  }

  return 'no solution'
}

async function taskB (input: string): Promise<any> {
  const inputArray = input.split('\n')
  const drawer = inputArray[0].split(',').map(stringDigit => +stringDigit);
  console.log(drawer)
  const boards = []
  for (let i = 2; i < inputArray.length - 2; i += 6) {
    const board = inputArray.slice(i, i + 5).map(row => row.match(/.{1,3}/g).map(stringDigit => +stringDigit))
    boards.push(board)
  }

  let finalSum = 0
  let finalDigit = 0
  const completedBoards: string[] = []
  const previouslyDrawn = []
  for (const drawnNumber of drawer) {
    previouslyDrawn.push(drawnNumber)
    for (const boardIndex in boards) {
      if (completedBoards.includes(boardIndex)) {
        continue;
      }
      const board = boards[boardIndex]
      for (const rowIndex in board) {
        const row = board[rowIndex]
        for (const colIndex in row) {
          const digit = row[colIndex]
          if (digit === drawnNumber) {
            // Check the row and col this digit is in to see if we have a bingo
            const sum = reverseCheck(board, rowIndex, colIndex, digit, previouslyDrawn)
            if (sum) {
              console.log('solution found!', drawnNumber, sum, board, rowIndex, colIndex)
              completedBoards.push(boardIndex)
              finalSum = sum
              finalDigit = drawnNumber
            }
          }
        }
      }
    }
  }
  return finalSum * finalDigit
}

export { taskA, taskB }
