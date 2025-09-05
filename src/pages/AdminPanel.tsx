import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

function randomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 5; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return `ECO-${out}`
}

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [gender, setGender] = useState('masculino')
  const [family, setFamily] = useState('floral')
  const [origin, setOrigin] = useState('importado')
  const [stock, setStock] = useState(10)
  const [file, setFile] = useState<File | null>(null)
  const [code, setCode] = useState(randomCode())
  const [msg, setMsg] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return setIsAdmin(false)
      const { data: prof } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      setIsAdmin(prof?.role === 'admin')
    })()
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    // upload da imagem (opcional)
    let image_url: string | null = null
    if (file) {
      const ext = file.name.split('.').pop()
      const filename = `${uuidv4()}.${ext}`
      const { data, error } = await supabase.storage.from('product-images').upload(filename, file)
      if (error) return setMsg(error.message)
      const { data: pub } = supabase.storage.from('product-images').getPublicUrl(data.path)
      image_url = pub?.publicUrl ?? null
    }

    const price_cents = Math.round(parseFloat(price.replace(',', '.')) * 100)
    const { error: insertErr } = await supabase.from('products').insert({
      code, name, description, price_cents, gender, family, origin, stock, image_url
    })
    if (insertErr) return setMsg(insertErr.message)
    setMsg('Produto cadastrado com sucesso!')
    setName(''); setDescription(''); setPrice(''); setStock(10); setFile(null); setCode(randomCode())
    navigate('/')
  }

  if (!isAdmin) return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="card p-4">Acesso restrito ao administrador.</div>
    </div>
  )

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-xl font-semibold mb-4">Cadastrar produto</h1>
      <form onSubmit={onSubmit} className="card p-4 space-y-4">
        {msg && <div className="text-sm text-green-700">{msg}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Código</label>
            <input className="input" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} />
          </div>
          <div>
            <label className="label">Preço (R$)</label>
            <input className="input" value={price} onChange={e=>setPrice(e.target.value)} placeholder="199,90" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Nome</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Descrição</label>
            <textarea className="input" value={description} onChange={e=>setDescription(e.target.value)} rows={3} />
          </div>
          <div>
            <label className="label">Gênero</label>
            <select className="input" value={gender} onChange={e=>setGender(e.target.value)}>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="unissex">Unissex</option>
            </select>
          </div>
          <div>
            <label className="label">Família</label>
            <select className="input" value={family} onChange={e=>setFamily(e.target.value)}>
              <option value="arabe">Árabe</option>
              <option value="amadeirado">Amadeirado</option>
              <option value="cítrico">Cítrico</option>
              <option value="floral">Floral</option>
              <option value="oriental">Oriental</option>
              <option value="outros">Outros</option>
            </select>
          </div>
          <div>
            <label className="label">Origem</label>
            <select className="input" value={origin} onChange={e=>setOrigin(e.target.value)}>
              <option value="importado">Importado</option>
              <option value="nacional">Nacional</option>
            </select>
          </div>
          <div>
            <label className="label">Estoque</label>
            <input type="number" className="input" value={stock} onChange={e=>setStock(parseInt(e.target.value || '0'))} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Imagem (opcional)</label>
            <input type="file" onChange={(e)=>setFile(e.target.files?.[0] ?? null)} />
          </div>
        </div>
        <button className="btn-primary">Salvar</button>
      </form>
    </div>
  )
}
