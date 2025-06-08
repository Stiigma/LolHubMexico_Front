import React from 'react';

interface TournamentCardProps {
  name: string;
  date: string;
  status: 'En progreso' | 'Finalizado' | 'Pendiente';
  teamCount: number;
  onClick?: () => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  name,
  date,
  status,
  teamCount,
  onClick,
}) => {
  const statusColor = {
    'En progreso': 'text-blue-400',
    'Finalizado': 'text-green-400',
    'Pendiente': 'text-yellow-400',
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 hover:bg-gray-700 cursor-pointer transition p-5 rounded-xl shadow-md"
    >
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-gray-400 mb-1">📅 {date}</p>
      <p className={`text-sm font-semibold ${statusColor[status]} mb-1`}>Estado: {status}</p>
      <p className="text-sm text-gray-300">👥 {teamCount} equipos</p>
    </div>
  );
};

export default TournamentCard;
