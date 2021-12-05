import * as fs from "fs-extra";
import { request } from "https";

makeDay(process.argv[2])
  .then(() => {
    console.log(
      `All done, created a directory for ${process.argv[2]}, containing the input`
    );
  })
  .catch((error) => {
    console.log("An error ocurred");
    console.log(error);
  });

function getAocInput(day: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const today = new Date()
    const req = request(
      {
        hostname: "adventofcode.com",
        path: `/${today.getFullYear()}/day/${day}/input`,
        port: 443,
        method: "GET",
        headers: {
          Cookie: "session=" + process.env.AOC_TOKEN,
        },
      },
      (res) => {
        res.on("data", (data) => {
          resolve(data.toString());
        });
      }
    );

    req.on("error", reject);
    req.end();
  });
}

async function makeDay(day: string): Promise<void> {
  if (!day) {
    throw new Error(
      "No day was provided, please append the day to your command"
    );
  }

  if (!process.env.AOC_TOKEN) {
    throw new Error("Please provide your AOC_TOKEN");
  }

  console.log(`Getting input data for day ${day}`);

  const response = await getAocInput(day);

  await fs.copy("./src/template", `./src/${day}`);
  await fs.writeFile(`./src/${day}/input`, response);
}
