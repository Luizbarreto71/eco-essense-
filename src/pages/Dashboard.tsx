import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Row = { product_id: string, name: string, total_qty: number, total_cents: number }
type KPI = { totalOrders: number, totalRevenue: number, topProduct?: string }

export default function Dashboard() {
  const [rows, setRows] = useState<Row[]>([])
  const [kpi, setKpi] = useState<KPI>({ totalOrders: 0, totalRevenue: 0 })

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const { data: table } = await supabase.from('sales_by_product').select('*').order('total_qty', { ascending: false })
    setRows((table as any) ?? [])

    const { data: k } = await supabase.rpc('kpi_totals')
    if (k) {
      setKpi({
        totalOrders: k.total_orders ?? 0,
        totalRevenue: k.total_revenue_cents ?? 0,
        topProduct: rows[0]?.name
      })
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-xl font-semibold mb-4">Dashboard de Vendas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="text-sm text-neutral-600">Pedidos</div>
          <div className="text-2xl font-bold">{kpi.totalOrders}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-neutral-600">Receita (BRL)</div>
          <div className="text-2xl font-bold">{(kpi.totalRevenue/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-neutral-600">Mais vendido</div>
          <div className="text-lg font-semibold">{rows[0]?.name ?? '—'}</div>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="text-left p-3 font-medium">Produto</th>
              <th className="text-left p-3 font-medium">Qtd</th>
              <th className="text-left p-3 font-medium">Receita</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.product_id} className="border-t border-neutral-200">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.total_qty}</td>
                <td className="p-3">{(r.total_cents/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
