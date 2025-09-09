import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-brand-light to-white py-16 px-6 lg:px-12 flex items-center justify-between">
      {/* Texto principal */}
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-dark leading-tight">
          Descubra o Luxo da <span className="text-brand-gold">Eco Parfums</span>
        </h1>
        <p className="text-lg text-brand-dark/80">
          Perfumes importados e exclusivos, selecionados para transformar momentos em experiências inesquecíveis.
        </p>
        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-brand-gold text-white px-6 py-3 rounded-lg text-lg shadow hover:opacity-90 transition"
          >
            Comprar Agora
          </Link>
          <Link
            to="/ofertas"
            className="border border-brand-gold text-brand-gold px-6 py-3 rounded-lg text-lg hover:bg-brand-gold hover:text-white transition"
          >
            Ver Ofertas
          </Link>
        </div>
      </div>

      {/* Imagem de destaque (coloque perfume ou banner depois) */}
      <div className="hidden md:block">
        <img
          src="/ecoparfums_logo_256.webp"
          alt="Eco Parfums"
          className="w-64 h-64 object-contain opacity-90"
        />
      </div>
    </section>
  );
}
