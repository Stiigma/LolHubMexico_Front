import React from 'react';

interface TournamentHeroBannerProps {
  onCreateTournament: () => void;
}

const TournamentHeroBanner: React.FC<TournamentHeroBannerProps> = ({ onCreateTournament }) => {
  return (
    <div className="bg-[#112a46] p-8 rounded-xl shadow-md text-center mb-10 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold text-white mb-4">
        ¡Compite por la Gloria en la Grieta!
      </h2>
      <p className="text-xl text-gray-300 mb-6">
        Encuentra, únete o crea torneos para desafiar a otros equipos y demostrar quién es el mejor.
      </p>
      <button
        onClick={onCreateTournament}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        Crear Torneo
      </button>
    </div>
  );
};

export default TournamentHeroBanner;
