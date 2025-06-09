import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 text-white px-6 py-20 flex flex-col items-center justify-center relative">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-md">
            Empieza a ser reconocido <br />
            <span className="text-sky-400">en uno de los mejores juegos</span>
          </h1>
          <p className="text-lg text-gray-300">
            Sé un gran competidor en este mundo y logra llegar a un eSports, no esperes más.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            Iniciar ahora
          </button>
        </div>

        {/* Imagen */}
        <div className="flex justify-center">
          <img
            src="/assets/Teams/dragon.jpg"
            alt="League of Legends Dragon"
            className="w-full max-w-md rounded-xl border-4 border-blue-700 shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

