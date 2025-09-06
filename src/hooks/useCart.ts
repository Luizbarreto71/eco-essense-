import { useEffect, useState } from 'react'
import { CartItem, Product } from '../types'



export default function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const raw = localStorage.getItem('eco_cart')
    if (raw) setItems(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('eco_cart', JSON.stringify(items))
  }, [items])

  const add = (p: Product, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.product.id === p.id)
      if (i >= 0) {
        const copy = [...prev]
        copy[i] = { product: p, qty: copy[i].qty + qty }
        return copy
      }
      return [...prev, { product: p, qty }]
    })
  }

  const remove = (id: string) => setItems(prev => prev.filter(x => x.product.id !== id))
  const clear = () => setItems([])

  return { items, add, remove, clear }
}
