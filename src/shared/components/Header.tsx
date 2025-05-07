import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <img src={logo} alt="logo" className="h-10" />
        <h1 className="font-bold text-xl text-gray-800">HUB LOL</h1>
      </div>
      <nav className="flex gap-6 items-center">
        <a href="#" className="text-gray-400 hover:text-gray-600">Tournaments</a>
        <a href="#" className="text-gray-400 hover:text-gray-600">Communities</a>
        <a href="#" className="text-gray-400 hover:text-gray-600">Blog</a>
        <button
          className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
          onClick={() => navigate('/login')}
        >
          Iniciar sesión
        </button>
      </nav>
    </header>
  );
};

export default Header;
