import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Product } from '../types'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [q, setQ] = useState('')
  const [gender, setGender] = useState('')
  const [family, setFamily] = useState('')
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data ?? [])
  }

  const filtered = products.filter(p => {
    const search = (p.name + ' ' + p.description + ' ' + p.family + ' ' + p.origin).toLowerCase()
    const okQ = q.trim() === '' || search.includes(q.toLowerCase())
    const okG = !gender || p.gender === gender
    const okF = !family || p.family === family
    const okO = !origin || p.origin === origin
    return okQ && okG && okF && okO
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
      <Filters gender={gender} setGender={setGender} family={family} setFamily={setFamily} origin={origin} setOrigin={setOrigin} />
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <SearchBar q={q} setQ={setQ} />
          <div className="text-sm text-neutral-600">{filtered.length} itens</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  )
}
