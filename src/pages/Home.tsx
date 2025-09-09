import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import HeroBanner from "../components/HeroBanner";
import CategoriesMenu from "../components/CategoriesMenu";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [gender, setGender] = useState("");
  const [family, setFamily] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data ?? []);
  };

  const filtered = products.filter((p) => {
    const search = (
      p.name +
      " " +
      p.description +
      " " +
      p.family +
      " " +
      p.origin
    ).toLowerCase();
    const okQ = q.trim() === "" || search.includes(q.toLowerCase());
    const okG = !gender || p.gender === gender;
    const okF = !family || p.family === family;
    const okO = !origin || p.origin === origin;
    return okQ && okG && okF && okO;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* 🔥 Banner principal */}
      <HeroBanner />

      {/* 🔥 Menu de categorias */}
      <CategoriesMenu />

      {/* 🔥 Seção de benefícios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center py-6">
        <div>
          <span className="text-3xl">🚚</span>
          <h3 className="font-semibold mt-2">Entrega Rápida</h3>
          <p className="text-sm text-gray-600">Enviamos para todo o Brasil</p>
        </div>
        <div>
          <span className="text-3xl">💳</span>
          <h3 className="font-semibold mt-2">Até 6x sem juros</h3>
          <p className="text-sm text-gray-600">Parcele no cartão de crédito</p>
        </div>
        <div>
          <span className="text-3xl">💸</span>
          <h3 className="font-semibold mt-2">10% OFF no PIX</h3>
          <p className="text-sm text-gray-600">Ganhe desconto pagando à vista</p>
        </div>
        <div>
          <span className="text-3xl">🎁</span>
          <h3 className="font-semibold mt-2">Brinde Exclusivo</h3>
          <p className="text-sm text-gray-600">Acima de R$249 em compras</p>
        </div>
      </div>

      {/* 🔥 Filtros e Produtos */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <Filters
          gender={gender}
          setGender={setGender}
          family={family}
          setFamily={setFamily}
          origin={origin}
          setOrigin={setOrigin}
        />
        <div>
          <div className="mb-4 flex items-center justify-between gap-2">
            <SearchBar q={q} setQ={setQ} />
            <div className="text-sm text-neutral-600">
              {filtered.length} itens
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
