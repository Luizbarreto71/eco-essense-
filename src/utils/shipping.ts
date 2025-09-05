export function calcFrete(cep: string, pesoKg: number) {
  // Stub simples: base + por "distância" (estimada pelo prefixo do CEP) + por peso
  // Troque por chamadas reais à API dos Correios / transportadora
  const clean = (cep || '').replace(/\D/g, '')
  const prefix = clean.slice(0, 2)
  const distFactor = Math.max(1, parseInt(prefix || '20', 10) / 10) // 01..99 -> 0.1..9.9
  const base = 14.9
  const porKm = 1.2 * distFactor
  const porKg = Math.max(0, pesoKg) * 4.5
  const prazoBase = 5 + Math.floor(distFactor)

  const pac = base + porKm + porKg
  const sedex = pac * 1.6
  return {
    pac: { valor: pac, prazo: prazoBase },
    sedex: { valor: sedex, prazo: Math.max(1, prazoBase - 2) }
  }
}
