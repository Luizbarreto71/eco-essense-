import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

type Product = {
  id: number
  name: string
  price: number
  stock: number
  created_at?: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [editing, setEditing] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<Product>>({})
  const [newProduct, setNewProduct] = useState<Partial<Product>>({})

  // Carregar produtos
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao carregar produtos:", error.message)
      return
    }
    setProducts(data ?? [])
  }

  // Salvar edição
  const saveEdit = async (id: number) => {
    const { error } = await supabase.from("products").update(form).eq("id", id)
    if (error) {
      console.error("Erro ao salvar produto:", error.message)
    } else {
      setEditing(null)
      loadProducts()
    }
  }

  // Adicionar novo produto
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Preencha ao menos Nome e Preço do produto")
      return
    }

    const { error } = await supabase.from("products").insert([newProduct])
    if (error) {
      console.error("Erro ao adicionar produto:", error.message)
    } else {
      setNewProduct({})
      loadProducts()
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Produtos</h1>

      {/* Formulário para adicionar produto */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h2 className="font-semibold mb-2">Adicionar Produto</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            className="border px-2 py-1 rounded"
            placeholder="Nome"
            value={newProduct.name ?? ""}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            className="border px-2 py-1 rounded"
            placeholder="Preço"
            value={newProduct.price ?? ""}
            onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          />
          <input
            type="number"
            className="border px-2 py-1 rounded"
            placeholder="Estoque"
            value={newProduct.stock ?? ""}
            onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
          />
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={addProduct}
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Tabela de produtos */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Preço</th>
            <th className="border p-2">Estoque</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(p => (
              <tr key={p.id}>
                <td className="border p-2">
                  {editing === p.id ? (
                    <input
                      className="border px-2"
                      defaultValue={p.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  ) : (
                    p.name ?? "-"
                  )}
                </td>
                <td className="border p-2">
                  {editing === p.id ? (
                    <input
                      type="number"
                      className="border px-2"
                      defaultValue={p.price}
                      onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                    />
                  ) : (
                    `R$ ${p.price ?? 0}`
                  )}
                </td>
                <td className="border p-2">
                  {editing === p.id ? (
                    <input
                      type="number"
                      className="border px-2"
                      defaultValue={p.stock}
                      onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                    />
                  ) : (
                    p.stock ?? 0
                  )}
                </td>
                <td className="border p-2">
                  {editing === p.id ? (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => saveEdit(p.id)}
                    >
                      Salvar
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setEditing(p.id)
                        setForm(p)
                      }}
                    >
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                Nenhum produto encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
