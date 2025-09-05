import { useState } from 'react'
import { calcFrete } from '../utils/shipping'

export default function Shipping() {
  const [cep, setCep] = useState('')
  const [peso, setPeso] = useState('0.5')
  const [out, setOut] = useState<{pac:{valor:number,prazo:number}, sedex:{valor:number,prazo:number}} | null>(null)

  const onCalc = (e: React.FormEvent) => {
    e.preventDefault()
    const r = calcFrete(cep, parseFloat(peso.replace(',', '.')) || 0.5)
    setOut(r)
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-xl font-semibold mb-4">Calculadora de Frete</h1>
      <form onSubmit={onCalc} className="card p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">CEP</label>
            <input className="input" value={cep} onChange={e=>setCep(e.target.value)} placeholder="49000-000" />
          </div>
          <div>
            <label className="label">Peso (kg)</label>
            <input className="input" value={peso} onChange={e=>setPeso(e.target.value)} placeholder="0,5" />
          </div>
        </div>
        <button className="btn-primary">Calcular</button>
      </form>
      {out && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="font-semibold">PAC</div>
            <div className="text-2xl font-bold">
              {out.pac.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <div className="text-sm text-neutral-600">Prazo ~ {out.pac.prazo} dias úteis</div>
          </div>
          <div className="card p-4">
            <div className="font-semibold">SEDEX</div>
            <div className="text-2xl font-bold">
              {out.sedex.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <div className="text-sm text-neutral-600">Prazo ~ {out.sedex.prazo} dias úteis</div>
          </div>
        </div>
      )}
    </div>
  )
}
