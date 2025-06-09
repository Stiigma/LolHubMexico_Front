import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TournamentDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const tournament = {
    name: 'Copa Grieta Suprema',
    date: '2025-06-05 al 2025-06-15',
    status: 'Finalizado', // o 'En progreso'
    format: 'Eliminación directa',
    winner: {
      name: 'Team Alpha',
      logo: '/assets/teams/alpha.png',
    },
    teams: [
      { name: 'Team Alpha', logo: '/assets/teams/alpha.png' },
      { name: 'Team Omega', logo: '/assets/teams/omega.png' },
      { name: 'Shadow Squad', logo: '/assets/teams/shadow.png' },
      { name: 'Golden Five', logo: '/assets/teams/golden.png' },
    ],
    matches: [
      { round: 'Cuartos de final', teamA: 'Team Alpha', teamB: 'Shadow Squad', score: '2-1' },
      { round: 'Cuartos de final', teamA: 'Team Omega', teamB: 'Golden Five', score: '2-0' },
      { round: 'Semifinal', teamA: 'Team Alpha', teamB: 'Team Omega', score: '2-1' },
    ],
  };

  const statusColor = {
    'Finalizado': 'text-green-400',
    'En progreso': 'text-blue-400',
    'Pendiente': 'text-yellow-400',
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white px-6 py-10 max-w-5xl mx-auto">
      {/* Info general del torneo */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">{tournament.name}</h1>
        <p className="text-gray-300 mb-1">📅 {tournament.date}</p>
        <p className={`font-semibold mb-2 ${statusColor[tournament.status as keyof typeof statusColor]}`}>
          Estado: {tournament.status}
        </p>
        <p className="text-gray-400">Formato: {tournament.format}</p>
      </div>

      {/* GANADOR FINAL */}
      {tournament.status === 'Finalizado' && tournament.winner && (
        <div className="bg-[#162a38] p-5 rounded-lg mb-8 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={tournament.winner.logo}
              alt={tournament.winner.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-green-400"
            />
            <div>
              <p className="text-lg font-semibold text-green-300">🏆 Ganador del torneo:</p>
              <p className="text-xl font-bold">{tournament.winner.name}</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/tournaments/${id}/bracket`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Ver Bracket completo
          </button>
        </div>
      )}

      {/* Equipos participantes */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-3">👥 Equipos Participantes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {tournament.teams.map((team, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-center gap-3 shadow">
              <img
                src={team.logo}
                alt={team.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
              <p className="text-base font-medium">{team.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partidas jugadas */}
      <div>
        <h2 className="text-2xl font-bold mb-3">🎮 Partidas Recientes</h2>
        <div className="space-y-4">
          {tournament.matches.map((match, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow"
            >
              <div>
                <p className="text-sm text-gray-400">{match.round}</p>
                <p className="text-lg font-semibold">
                  {match.teamA} vs {match.teamB}
                </p>
              </div>
              <p className="text-green-400 font-bold text-lg">{match.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailPage;




