async function taskA(input: string): Promise<any> {
  const lines = input.split("\n");
  const counts: { [key: number]: number } = {};
  const lineLength = lines[0].length - 1;
  const numLines = lines.length;
  for (const line of lines) {
    for (let i = 0; i < lineLength; ++i) {
      if (!counts[i]) counts[i] = 0;
      counts[i] += line[i] === "1" ? 1 : 0;
    }
  }

  let binaryGamma = "";
  let binaryEpsilon = "";
  for (let i = 0; i < lineLength; ++i) {
    const gamma = counts[i] > numLines / 2 ? "1" : "0";
    const epsilon = gamma === "1" ? "0" : "1";
    binaryGamma += gamma;
    binaryEpsilon += epsilon;
  }

  const gamma = parseInt(binaryGamma, 2);
  const epsilon = parseInt(binaryEpsilon, 2);

  console.log(binaryGamma, gamma, binaryEpsilon, epsilon);

  return gamma * epsilon;
}

function countOnes(lines: string[], index: number) {
  let count = 0;
  for (const line of lines) {
    count += line[index] === "1" ? 1 : 0;
  }
  return count;
}

async function taskB(input: string): Promise<any> {
  let lines = input.split("\n");
  const lineLength = lines[0].length;

  let oxygen = Array.from(lines);
  let co2 = Array.from(lines);
  for (let i = 0; i < lineLength; ++i) {
    let count = countOnes(oxygen, i);
    let keep = count >= oxygen.length / 2 ? "1" : "0";
    oxygen = oxygen.filter((entry) => entry[i] === keep);
    console.log("new", oxygen, count, keep);
    if (oxygen.length === 1) {
      break;
    }
  }

  for (let i = 0; i < lineLength; ++i) {
    let count = countOnes(co2, i);
    let keep = count >= co2.length / 2 ? "0" : "1";
    // Remove all entries with a '1' in this index
    co2 = co2.filter((entry) => entry[i] === keep);
    console.log("new co", co2, count, keep);
    if (co2.length === 1) {
      break;
    }
  }

  const oxygenDec = parseInt(oxygen[0], 2);
  const co2Dec = parseInt(co2[0], 2);

  console.log(oxygen, oxygenDec, co2, co2Dec);

  return oxygenDec * co2Dec;
}

export { taskA, taskB };
