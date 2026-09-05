import express, { Request, Response } from "express"
import cors from "cors"

export const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// ---- Rota Raiz & Health ----
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API de e-commerce funcionando!" })
})

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() })
})

// ---- Auth ----
app.post("/auth/register", (_req: Request, res: Response) => {
  res.json({ message: "esta é a rota /auth/register" })
})

app.post("/auth/login", (_req: Request, res: Response) => {
  res.json({ message: "esta é a rota /auth/login" })
})

// ---- Products ----
app.get("/products", (_req: Request, res: Response) => {
  res.json([
    { id: 1, name: "Camiseta", price: 49.9 },
    { id: 2, name: "Calça", price: 89.9 },
  ])
})

app.get("/products/:id", (req: Request, res: Response) => {
  res.json({ message: `esta é a rota /products/${req.params.id}` })
})

app.post("/products", (_req: Request, res: Response) => {
  res.json({ message: "esta é a rota /products (criar)" })
})

app.put("/products/:id", (req: Request, res: Response) => {
  res.json({ message: `esta é a rota PUT /products/${req.params.id}` })
})

app.delete("/products/:id", (req: Request, res: Response) => {
  res.json({ message: `esta é a rota DELETE /products/${req.params.id}` })
})

// ---- Orders ----
app.post("/orders", (_req: Request, res: Response) => {
  res.json({ message: "esta é a rota /orders" })
})

app.get("/orders", (_req: Request, res: Response) => {
  res.json({ message: "esta é a rota /orders" })
})

app.get("/orders/:id", (req: Request, res: Response) => {
  res.json({ message: `esta é a rota /orders/${req.params.id}` })
})

app.put("/orders/:id/status", (req: Request, res: Response) => {
  res.json({ message: `esta é a rota PUT /orders/${req.params.id}/status` })
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  })
}
