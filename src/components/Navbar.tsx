import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const loc = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user
      setUserEmail(u?.email ?? null)
      if (u?.id) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', u.id)
          .single()
        setIsAdmin(prof?.role === 'admin')
      } else {
        setIsAdmin(false)
      }
    })
  }, [loc])

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-bold tracking-tight text-lg">Eco Essence</Link>
        <nav className="ml-auto flex items-center gap-2">
          <Link className="btn" to="/frete">Frete</Link>
          {isAdmin && <Link className="btn" to="/admin">Painel</Link>}
          {isAdmin && <Link className="btn" to="/admin/dashboard">Dashboard</Link>}
          {!userEmail ? (
            <>
              <Link className="btn" to="/auth/login">Entrar</Link>
              <Link className="btn-primary" to="/auth/register">Criar conta</Link>
            </>
          ) : (
            <>
              <span className="hidden sm:inline text-sm text-neutral-600">Olá, {userEmail}</span>
              <button className="btn" onClick={logout}>Sair</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}