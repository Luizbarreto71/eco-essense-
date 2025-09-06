import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaShoppingCart, FaUser } from "react-icons/fa";

// Supabase client
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;

    const load = async () => {
      setLoading(true);
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes?.user ?? null;

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        if (!cancel) setIsAdmin(profile?.role === "admin");
      } else {
        if (!cancel) setIsAdmin(false);
      }
      if (!cancel) setLoading(false);
    };

    load();

    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      cancel = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="w-full shadow-sm">
      {/* Faixa de promoções */}
      <div className="bg-amber-200 text-center text-sm py-1 font-medium">
        10% OFF pagando com PIX / 5% OFF na primeira compra com o cupom{" "}
        <span className="font-bold">CUPOM5</span>
      </div>

      {/* Logo + busca + ícones */}
      <div className="flex items-center justify-between bg-neutral-50 px-6 py-4">
        {/* Logo */}
        <span className="text-xl font-serif tracking-widest text-gray-800">
          Eco Essence
        </span>

        {/* Barra de busca */}
        <div className="flex flex-1 mx-8">
          <input
            type="text"
            placeholder="O que você está buscando?"
            className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button className="bg-amber-500 px-4 rounded-r-full text-white hover:bg-amber-600 transition">
            🔍
          </button>
        </div>

        {/* Ícones */}
        <div className="flex items-center space-x-6">
          <FaUser className="text-xl cursor-pointer text-gray-700 hover:text-black transition" />
          <FaShoppingCart className="text-xl cursor-pointer text-gray-700 hover:text-black transition" />

          {/* Botões admin */}
          {!loading && isAdmin && (
            <div className="flex items-center space-x-2">
              <a
                href="/painel"
                className="text-sm border border-gray-500 px-2 py-1 rounded hover:bg-gray-200 transition"
              >
                Painel
              </a>
              <a
                href="/dashboard"
                className="text-sm border border-gray-500 px-2 py-1 rounded hover:bg-gray-200 transition"
              >
                Dashboard
              </a>
              <a
                href="/frete"
                className="text-sm border border-gray-500 px-2 py-1 rounded hover:bg-gray-200 transition"
              >
                Frete
              </a>
              <button
                onClick={handleSignOut}
                className="text-sm border border-gray-500 px-2 py-1 rounded hover:bg-gray-200 transition"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menu de categorias */}
      <nav className="flex items-center justify-center bg-white border-t border-b border-gray-200 text-sm font-medium text-gray-700">
        <a href="#" className="px-4 py-3 hover:text-amber-600 transition">
          Perfumes Árabes
        </a>
        <a href="#" className="px-4 py-3 hover:text-amber-600 transition">
          Linha Eco Essence
        </a>
        <a href="#" className="px-4 py-3 hover:text-amber-600 transition">
          Ofertas Especiais
        </a>
        <a href="#" className="px-4 py-3 hover:text-amber-600 transition">
          Brand Collection
        </a>
        <a href="#" className="px-4 py-3 hover:text-amber-600 transition">
          Feminino
        </a>
        <a href="#" className="px-4 py-3 hover:text-amber-600 transition">
          Masculino
        </a>
      </nav>
    </header>
  );
}
