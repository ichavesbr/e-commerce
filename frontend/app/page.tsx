export const dynamic = "force-dynamic" // evita pré-render estático no build

export default async function Home() {
  const res = await fetch(`${process.env.BACKEND_URL}/products`)
  if (!res.ok) throw new Error("Erro ao buscar produtos")
  const products = await res.json()

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1>WELCOME</h1>
      <br />
      <div>
        <p>Dados do backend:</p>
        {products.map(({ id, name, price }: { id: number; name: string; price: number }) => (
          <ul key={id}>
            <li>
              {id} - {name} - {price}
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}
