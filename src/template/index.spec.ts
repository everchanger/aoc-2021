import { describe, expect, test } from "@jest/globals"

import { taskA, taskB } from "./index"

describe("Tasks for [year] [day]", () => {
  test("Task A", async () => {
    expect(await taskA("")).toBe("")
  })

  test("Task B", async () => {
    expect(await taskB("")).toBe("")
  })
})
