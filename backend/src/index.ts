import express, { Request, Response } from "express"

const app = express()
const PORT = 3000

app.use(express.json())

// Rota raiz
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API de e-commerce funcionando!" })
})

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() })
})

// Produtos (mock por enquanto)
app.get("/products", (req: Request, res: Response) => {
  res.json([
    { id: 1, name: "Camiseta", price: 49.9 },
    { id: 2, name: "Calça", price: 89.9 },
  ])
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
