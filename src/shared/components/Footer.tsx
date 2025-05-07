import React from 'react';
import logo from '../../assets/logo.png'; // Ajusta la ruta si es diferente

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-6 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo y marca */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Yuppi Logo" className="h-6 w-auto" />
          <span className="text-sm font-medium text-white">Yuppi LeagueHub © {new Date().getFullYear()}</span>
        </div>

        {/* Links rápidos (opcional) */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">Términos</a>
          <a href="#" className="hover:text-white transition">Privacidad</a>
          <a href="#" className="hover:text-white transition">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
