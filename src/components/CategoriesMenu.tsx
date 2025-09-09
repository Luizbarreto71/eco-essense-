export default function CategoriesMenu() {
  const items = [
    "Perfumes Árabes",
    "Linha Eco Essence",
    "Ofertas Especiais",
    "Até 199,90",
    "Victoria’s Secret",
    "Perfumes em Spray",
    "Brand Collection",
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-6 py-3 text-sm font-medium text-neutral-700 bg-brand-light">
      {items.map((item, i) => (
        <a
          key={i}
          href="#"
          className="hover:text-brand-gold transition"
        >
          {item}
        </a>
      ))}
    </nav>
  );
}
