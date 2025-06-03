import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full px-6 py-4 bg-gradient-to-r from-blue-900 to-sky-800 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-8">
        
        {/* Logo + título */}
        <div className="flex items-center gap-4">
          <img src="/assets/logo.png" alt="Logo" className="w-14 h-14 object-contain" />
          <h1 className="text-white text-2xl font-bold tracking-wide">HUB LOL</h1>
        </div>

        {/* Menú */}
        <nav className="hidden md:flex gap-8 text-white text-sm font-medium">
          <a href="#" className="hover:text-blue-300 transition">Torneos</a>
          <a href="#" className="hover:text-blue-300 transition">Comunidades</a>
          <a href="#" className="hover:text-blue-300 transition">Blog</a>
        </nav>

        {/* Botón */}
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
        >
          Iniciar ahora
        </button>
      </div>
    </header>
  );
};

export default Header;


