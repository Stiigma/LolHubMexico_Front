import React from 'react';
import { useNavigate } from 'react-router-dom';
import DragonImg from '../../../assets/dragon.jpg'; // Asegúrate de tener esta imagen en assets

const HeroSection: React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <section className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Texto */}
          <div className="flex-1 text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-white drop-shadow-md">
              Domina la grieta. <br />
              <span className="text-yellow-400">Haz tu nombre conocido</span>
            </h1>
            <p className="mt-6 text-lg text-gray-200 leading-relaxed">
              League of Legends no es solo un juego... es un escenario global para demostrar tu habilidad.
              Participa en torneos, destaca entre los mejores, y conviértete en una leyenda. 🏆
            </p>
            <p className="mt-4 text-gray-400 italic text-sm">
              Desde Bronce hasta Challenger, cada victoria cuenta. Tu historia competitiva comienza aquí.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow-lg transition duration-300"
            >
              Comienza tu ascenso
            </button>
          </div>
  
          {/* Imagen */}
          <div className="flex-1 flex justify-center animate-fade-in-up">
            <img
              src={DragonImg}
              alt="League of Legends Dragon"
              className="w-80 md:w-96 rounded-xl border-4 border-blue-700 shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;