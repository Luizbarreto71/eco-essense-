import { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  const priceBRL = (product.price_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return (
    <div className="card overflow-hidden">
      {product.image_url ? (
        <img src={product.image_url} alt={product.name} className="h-56 w-full object-cover" />
      ) : (
        <div className="h-56 w-full bg-neutral-200" />
      )}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{product.name}</h3>
          <span className="badge">{product.code}</span>
        </div>
        <p className="text-sm text-neutral-600 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">{priceBRL}</div>
          <button className="btn-primary">Adicionar</button>
        </div>
        <div className="mt-2 flex gap-2 text-xs text-neutral-600">
          <span className="badge capitalize">{product.gender}</span>
          <span className="badge capitalize">{product.family}</span>
          <span className="badge capitalize">{product.origin}</span>
        </div>
      </div>
    </div>
  )
}
