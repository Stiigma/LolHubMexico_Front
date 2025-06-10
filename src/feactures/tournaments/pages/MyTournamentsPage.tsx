import React from 'react';
import { useNavigate } from 'react-router-dom';

type StatusType = 'En progreso' | 'Completado' | 'Pendiente';

interface Tournament {
  id: number;
  name: string;
  date: string;
  status: StatusType;
  additionalInfo: string;
  teams: {
    team1: string;
    team2: string;
  };
}

const MyTournamentsPage: React.FC = () => {
  const navigate = useNavigate();

  const myTournaments: Tournament[] = [
    {
      id: 1,
      name: 'Copa Grieta Suprema',
      date: '2025-06-05 al 2025-06-15',
      status: 'En progreso',
      additionalInfo: 'Información adicional del torneo',
      teams: {
        team1: 'Equipo Alpha',
        team2: 'Equipo Beta',
      },
    },
    {
      id: 2,
      name: 'Torneo Clash de Titanes',
      date: '2025-05-10 al 2025-05-20',
      status: 'Completado',
      additionalInfo: 'Gran final jugada con éxito',
      teams: {
        team1: 'Los Vengadores',
        team2: 'Guardianes de la Galaxia',
      },
    },
    {
      id: 3,
      name: 'Copa Regional de Verano',
      date: '2025-07-01 al 2025-07-10',
      status: 'Pendiente',
      additionalInfo: 'Próximo torneo, inscripciones abiertas',
      teams: {
        team1: 'Equipo X',
        team2: 'Equipo Y',
      },
    },
  ];

  const completedTournaments = myTournaments.filter(
    (tournament) => tournament.status === 'Completado'
  );

  const activeTournaments = myTournaments.filter(
    (tournament) =>
      tournament.status === 'En progreso' || tournament.status === 'Pendiente'
  );

  const statusColor: Record<StatusType, string> = {
    'En progreso': 'text-blue-400',
    Completado: 'text-green-400',
    Pendiente: 'text-yellow-400',
  };

  const handleTournamentClick = (id: number) => {
    navigate(`/tournaments/${id}`);
  };

  return (
    <div className="text-white px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Mis Torneos Activos</h1>

      {activeTournaments.length === 0 ? (
        <p className="text-gray-400">No hay torneos activos en este momento.</p>
      ) : (
        <div className="space-y-4">
          {activeTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-gray-800 p-5 rounded-xl shadow-md cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => handleTournamentClick(tournament.id)}
            >
              <h3 className="text-xl font-bold mb-1">{tournament.name}</h3>
              <p className="text-sm text-gray-400">Fecha: {tournament.date}</p>
              <p className={`text-sm font-semibold ${statusColor[tournament.status]}`}>
                Estado: {tournament.status}
              </p>
              {tournament.additionalInfo && (
                <p className="text-sm text-gray-400 mt-1">
                  {tournament.additionalInfo}
                </p>
              )}
              <div className="text-sm text-gray-400 mt-2">
                <p>Equipo 1: {tournament.teams.team1}</p>
                <p>Equipo 2: {tournament.teams.team2}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {completedTournaments.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-10 mb-4">Historial de Torneos</h2>
          <div className="space-y-4">
            {completedTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-gray-800 p-5 rounded-xl shadow-md cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => handleTournamentClick(tournament.id)}
              >
                <h3 className="text-xl font-bold mb-1">{tournament.name}</h3>
                <p className="text-sm text-gray-400">Fecha: {tournament.date}</p>
                <p className={`text-sm font-semibold ${statusColor[tournament.status]}`}>
                  Estado: {tournament.status}
                </p>
                {tournament.additionalInfo && (
                  <p className="text-sm text-gray-400 mt-1">
                    {tournament.additionalInfo}
                  </p>
                )}
                <div className="text-sm text-gray-400 mt-2">
                  <p>Equipo 1: {tournament.teams.team1}</p>
                  <p>Equipo 2: {tournament.teams.team2}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyTournamentsPage;

