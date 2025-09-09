import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        const u = data?.user ?? null;
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
      } catch (e) {
        console.error(e);
        setIsAdmin(false);
        setUserEmail(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [loc]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-brand-light/95 backdrop-blur border-b border-brand-light">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        {/* Logo + marca */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/ecoparfums_logo_512.png" // coloque este arquivo em /public
            alt="Eco Parfums"
            className="h-20 w-20 object-contain"
            loading="eager"
          />
          <span className="font-serif text-2xl tracking-wide font-bold text-brand-gold">
            ECO PARFUMS
          </span>
        </Link>

        {/* busca central opcional (coloque seu componente aqui depois) */}
        <div className="ml-auto" />

        {/* ações / navegação */}
        <nav className="flex items-center gap-3 text-brand-dark">
          <Link className="px-3 py-1 rounded hover:text-brand-gold transition" to="/frete">
            Frete
          </Link>

          {/* Botões Admin */}
          {!loading && isAdmin && (
            <>
              <Link className="px-3 py-1 rounded hover:text-brand-gold transition" to="/admin">
                Painel
              </Link>
              <Link className="px-3 py-1 rounded hover:text-brand-gold transition" to="/admin/dashboard">
                Dashboard
              </Link>
              <Link className="px-3 py-1 rounded hover:text-brand-gold transition" to="/admin/products">
                Produtos
              </Link>
            </>
          )}

          {/* login / conta */}
          {!loading && !userEmail ? (
            <>
              <Link className="px-3 py-1 rounded hover:text-brand-gold transition" to="/auth/login">
                Entrar
              </Link>
              <Link
                className="px-3 py-1 rounded bg-brand-gold text-white hover:opacity-90 transition"
                to="/auth/register"
              >
                Criar conta
              </Link>
            </>
          ) : !loading && userEmail ? (
            <>
              <span className="hidden sm:inline text-sm text-brand-dark/80">Olá, {userEmail}</span>
              <button className="px-3 py-1 rounded hover:text-brand-gold transition" onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <span className="text-sm text-brand-dark/60">Carregando…</span>
          )}

          {/* ícones */}
          <FaUser className="text-xl cursor-pointer hover:text-brand-gold transition" />
          <FaShoppingCart className="text-xl cursor-pointer hover:text-brand-gold transition" />
        </nav>
      </div>
    </header>
  );
}

