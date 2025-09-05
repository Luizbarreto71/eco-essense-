type Props = {
  q: string
  setQ: (v: string) => void
}
export default function SearchBar({ q, setQ }: Props) {
  return (
    <div className="flex gap-2">
      <input
        className="input"
        placeholder="Buscar perfumes, marcas, famílias..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </div>
  )
}
