import { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";

interface NavbarProps {
  isAdmin?: boolean; // passa true se for admin
}

export default function Navbar({ isAdmin = false }: NavbarProps) {
  const [openFilters, setOpenFilters] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  return (
    <>
      {/* Navbar fixa estilo luxo */}
      <div className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md">
        {/* Logo */}
        <span className="text-2xl font-serif tracking-widest">
          Eco Essence
        </span>

        {/* Barra de busca central */}
        <div className="hidden md:flex flex-1 mx-8">
          <input
            type="text"
            placeholder="Buscar perfumes, marcas..."
            className="w-full border border-gray-600 rounded-full px-4 py-2 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Ícones + botões */}
        <div className="flex items-center space-x-6">
          {/* Botão filtros avançados */}
          <button
            onClick={() => setOpenFilters(true)}
            className="hidden md:block border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black transition"
          >
            Filtros avançados
          </button>

          {/* Ícones */}
          <FaShoppingCart className="text-xl cursor-pointer hover:text-gray-300 transition" />
          <FaUser className="text-xl cursor-pointer hover:text-gray-300 transition" />

          {/* Botão admin só aparece se for admin */}
          {isAdmin && (
            <button
              onClick={() => setOpenAdmin(true)}
              className="border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black transition"
            >
              Admin
            </button>
          )}
        </div>
      </div>

      {/* Overlay para filtros */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition ${
          openFilters ? "block" : "hidden"
        }`}
        onClick={() => setOpenFilters(false)}
      />

      {/* Sidebar de filtros */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white text-black shadow-2xl z-50 transform transition-transform duration-500 ${
          openFilters ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <FaTimes
            className="text-xl cursor-pointer hover:text-gray-500"
            onClick={() => setOpenFilters(false)}
          />
        </div>

        {/* Filtros */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Gênero</label>
            <select className="w-full border p-2 rounded">
              <option>Todos</option>
              <option>Masculino</option>
              <option>Feminino</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Família</label>
            <select className="w-full border p-2 rounded">
              <option>Todas</option>
              <option>Amadeirado</option>
              <option>Cítrico</option>
              <option>Floral</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Origem</label>
            <select className="w-full border p-2 rounded">
              <option>Todas</option>
              <option>Importado</option>
              <option>Nacional</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overlay para admin */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition ${
          openAdmin ? "block" : "hidden"
        }`}
        onClick={() => setOpenAdmin(false)}
      />

      {/* Sidebar Admin */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white shadow-2xl z-50 transform transition-transform duration-500 ${
          openAdmin ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Admin</h2>
          <FaTimes
            className="text-xl cursor-pointer hover:text-gray-300"
            onClick={() => setOpenAdmin(false)}
          />
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-gray-200 font-light tracking-wide">
          <a href="/painel" className="hover:text-white transition">
            Painel
          </a>
          <a href="/dashboard" className="hover:text-white transition">
            Dashboard
          </a>
          <a href="/frete" className="hover:text-white transition">
            Frete
          </a>
          <a href="/sair" className="hover:text-white transition">
            Sair
          </a>
        </nav>
      </div>
    </>
  );
}
