import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user;
      setUserEmail(u?.email ?? null);

      if (u?.id) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", u.id)
          .single();

        setIsAdmin(prof?.role === "admin");
      } else {
        setIsAdmin(false);
      }
    });
  }, [loc]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="font-bold tracking-tight text-lg">
          Eco Essence
        </Link>

        {/* Barra de navegação */}
        <nav className="ml-auto flex items-center gap-4">
          {/* Sempre visível */}
          <Link className="btn" to="/frete">Frete</Link>

       {/* Admin */}
{isAdmin && (
  <>
    <Link className="btn" to="/admin">Painel</Link>
    <Link className="btn" to="/admin/dashboard">Dashboard</Link>
    <Link className="btn" to="/admin/products">Produtos</Link> {/* <-- NOVO */}
  </>
)}


          {/* Login / Logout */}
          {!userEmail ? (
            <>
              <Link className="btn" to="/auth/login">Entrar</Link>
              <Link className="btn-primary" to="/auth/register">Criar conta</Link>
            </>
          ) : (
            <>
              <span className="hidden sm:inline text-sm text-neutral-600">
                Olá, {userEmail}
              </span>
              <button className="btn" onClick={logout}>Sair</button>
            </>
          )}

          {/* Ícones */}
          <FaUser className="text-xl cursor-pointer text-gray-700 hover:text-black transition" />
          <FaShoppingCart className="text-xl cursor-pointer text-gray-700 hover:text-black transition" />
        </nav>
      </div>
    </header>
  );
}
