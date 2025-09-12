import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-brand-light via-white to-brand-gold py-12">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        {/* Texto à esquerda */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">
            Descubra o Luxo da <span className="text-brand-gold">Eco Parfums</span>
          </h1>
          <p className="text-lg text-brand-dark/80 max-w-lg">
            Perfumes importados e exclusivos, selecionados para transformar momentos em experiências inesquecíveis.
          </p>
          <div className="flex gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-brand-gold text-white font-medium rounded hover:opacity-90 transition"
            >
              Comprar Agora
            </Link>
            <Link
              to="/"
              className="px-6 py-3 border border-brand-gold text-brand-gold font-medium rounded hover:bg-brand-gold hover:text-white transition"
            >
              Ver Ofertas
            </Link>
          </div>
        </div>

        {/* Imagem à direita */}
        <div className="flex justify-center">
          <img
            src="/banners/Rush.webp" // coloque uma imagem na pasta /public/banners
            alt="Eco Parfums"
            className="rounded-lg shadow-lg max-h-[400px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
