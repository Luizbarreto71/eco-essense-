import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar"; // 👈 importa a TopBar

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-light via-white to-brand-gold/5">
      {/* 🔥 Faixa superior */}
      <TopBar />

      {/* 🔥 Navbar */}
      <Navbar />

      {/* 🔥 Conteúdo da página */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 🔥 Rodapé */}
      <footer className="mt-10 border-t border-neutral-200 p-6 text-center text-sm text-neutral-500">
        Eco Parfums © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
