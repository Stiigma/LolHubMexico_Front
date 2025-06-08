import React from 'react';

const TournamentDetailPage: React.FC = () => {
  const tournament = {
    name: 'Copa Grieta Suprema',
    date: '2025-06-05 al 2025-06-15',
    status: 'En progreso',
    format: 'Eliminación directa',
    teams: [
      { name: 'Team Alpha', logo: '/assets/teams/alpha.png' },
      { name: 'Team Omega', logo: '/assets/teams/omega.png' },
      { name: 'Shadow Squad', logo: '/assets/teams/shadow.png' },
      { name: 'Golden Five', logo: '/assets/teams/golden.png' },
    ],
    matches: [
      { round: 'Cuartos de final', teamA: 'Team Alpha', teamB: 'Shadow Squad', score: '2-1' },
      { round: 'Cuartos de final', teamA: 'Team Omega', teamB: 'Golden Five', score: '2-0' },
    ],
  };

  return (
    <div className="text-white px-8 py-6">
      <h1 className="text-3xl font-bold mb-2">{tournament.name}</h1>
      <p className="text-gray-300 mb-1">📅 {tournament.date}</p>
      <p className="text-blue-400 font-semibold mb-4">Estado: {tournament.status}</p>
      <p className="mb-6 text-gray-400">Formato: {tournament.format}</p>

      {/* Equipos */}
      <h2 className="text-2xl font-bold mb-3">Equipos Participantes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {tournament.teams.map((team, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
            <img
              src={team.logo}
              alt={team.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <p className="text-lg font-medium">{team.name}</p>
          </div>
        ))}
      </div>

      {/* Matches */}
      <h2 className="text-2xl font-bold mb-3">Partidas Recientes</h2>
      <div className="space-y-3">
        {tournament.matches.map((match, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
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
  );
};

export default TournamentDetailPage;


