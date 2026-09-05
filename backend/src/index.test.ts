import { describe, it, expect, beforeAll, afterAll } from "vitest"
import type { Server } from "node:http"
import { app } from "./index"

let server: Server
let baseURL: string

beforeAll(async () => {
  await new Promise<void>(resolve => (server = app.listen(0, () => resolve())))
  const address = server.address()
  if (address && typeof address === "object") {
    baseURL = `http://localhost:${address.port}`
  } else {
    throw new Error("Servidor de teste não iniciou")
  }
})

afterAll(() => {
  server.close()
})

describe("Rotas básicas", () => {
  it("GET / responde com a mensagem da API", async () => {
    const res = await fetch(`${baseURL}/`)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.message).toContain("e-commerce")
  })

  it("GET /health responde com status ok", async () => {
    const res = await fetch(`${baseURL}/health`)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.status).toBe("ok")
  })
})
