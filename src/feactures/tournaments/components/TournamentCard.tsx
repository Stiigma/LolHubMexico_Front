import React from 'react';

interface TournamentCardProps {
  name: string;
  date?: string;
  status?: 'En progreso' | 'Finalizado' | 'Pendiente';
  teamCount?: number;
  logo?: string;
  winner?: boolean;
  onClick?: () => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  name,
  date,
  status,
  teamCount,
  logo,
  winner,
  onClick,
}) => {
  const statusColor = {
    'En progreso': 'text-blue-400',
    'Finalizado': 'text-green-400',
    'Pendiente': 'text-yellow-400',
  };

  const isBracketCard = logo !== undefined;

  // Tarjeta para Bracket
  if (isBracketCard) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-4 px-6 py-4 rounded-xl w-[340px] shadow-md border-[3px] transition-all duration-300
        ${winner ? 'border-green-400 bg-[#1e2a38]' : 'border-gray-600 bg-[#16202c]'}`}
      >
        <img src={logo} alt={name} className="w-10 h-10 rounded-full border border-white object-cover" />
        <span className={`text-lg font-semibold ${winner ? 'text-green-300' : 'text-white'}`}>{name}</span>
        {winner && <span className="ml-auto text-green-400 text-xl">🏆</span>}
      </div>
    );
  }

  // Tarjeta de vista previa de torneos
  return (
    <div className="bg-gray-800 hover:bg-gray-700 transition p-5 rounded-xl shadow-md w-full">
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      {date && <p className="text-sm text-gray-400 mb-1">📅 {date}</p>}
      {status && (
        <p className={`text-sm font-semibold ${statusColor[status]} mb-1`}>
          Estado: {status}
        </p>
      )}
      {teamCount !== undefined && (
        <p className="text-sm text-gray-300 mb-2">👥 {teamCount} equipos</p>
      )}

      {/* Botón Participar */}
      {status === 'En progreso' || status === 'Pendiente' ? (
        <button
          onClick={onClick}
          className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          Participar
        </button>
      ) : (
        <p className="mt-2 text-sm text-red-500 font-semibold">Cerrado</p>
      )}
    </div>
  );
};

export default TournamentCard;

