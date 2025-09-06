import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminPanel from './pages/AdminPanel'
import Dashboard from './pages/Dashboard'
import Shipping from './pages/Shipping'
import AdminProducts from "./pages/AdminProducts"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth/login", element: <Login /> },
      { path: "auth/register", element: <Register /> },
      { path: "admin", element: <AdminPanel /> },
      { path: "admin/dashboard", element: <Dashboard /> },
      { path: "admin/products", element: <AdminProducts /> },   // <-- AQUI
      { path: "frete", element: <Shipping /> },
    ],
  },
])
