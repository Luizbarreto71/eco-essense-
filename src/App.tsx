import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="mt-10 border-t border-neutral-200 p-6 text-center text-sm text-neutral-500">
        Eco Essence © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
