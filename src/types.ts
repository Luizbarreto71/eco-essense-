export type Gender = 'masculino' | 'feminino' | 'unissex'
export type Family = 'arabe' | 'amadeirado' | 'cítrico' | 'floral' | 'oriental' | 'outros'
export type Origin = 'importado' | 'nacional'

export type Product = {
  id: string
  code: string
  name: string
  description: string
  price_cents: number
  gender: Gender
  family: Family
  origin: Origin
  image_url: string | null
  stock: number
  created_at: string
}

export type CartItem = {
  product: Product
  qty: number
}
