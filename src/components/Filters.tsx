type Props = {
  gender: string
  setGender: (v: string) => void
  family: string
  setFamily: (v: string) => void
  origin: string
  setOrigin: (v: string) => void
}

export default function Filters({ gender, setGender, family, setFamily, origin, setOrigin }: Props) {
  return (
    <aside className="card p-4 h-fit">
      <h4 className="font-semibold mb-3">Filtros</h4>
      <div className="space-y-4 text-sm">
        <div>
          <label className="label">Gênero</label>
          <select className="input" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Todos</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="unissex">Unissex</option>
          </select>
        </div>
        <div>
          <label className="label">Família</label>
          <select className="input" value={family} onChange={(e) => setFamily(e.target.value)}>
            <option value="">Todas</option>
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
          <select className="input" value={origin} onChange={(e) => setOrigin(e.target.value)}>
            <option value="">Todas</option>
            <option value="importado">Importado</option>
            <option value="nacional">Nacional</option>
          </select>
        </div>
      </div>
    </aside>
  )
}
