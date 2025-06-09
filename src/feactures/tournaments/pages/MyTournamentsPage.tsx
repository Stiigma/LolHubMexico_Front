import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyTournamentsPage: React.FC = () => {
  const navigate = useNavigate();

  const myTournaments = [
    {
      id: 1,
      name: 'Copa Grieta Suprema',
      date: '2025-06-05 al 2025-06-15',
      status: 'En progreso',
      editable: true,
    },
    {
      id: 2,
      name: 'Torneo Clash de Titanes',
      date: '2025-05-10 al 2025-05-20',
      status: 'Finalizado',
      editable: false,
    },
  ];

  // const statusColor = {
  //   'En progreso': 'text-blue-400',
  //   'Finalizado': 'text-green-400',
  //   'Pendiente': 'text-yellow-400',
  // };

  return (
    <div className="text-white px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Mis Torneos</h1>

      {myTournaments.length === 0 ? (
        <p className="text-gray-400">No estás registrado en ningún torneo aún.</p>
      ) : (
        <div className="space-y-4">
          {myTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-gray-800 p-5 rounded-xl shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold mb-1">{tournament.name}</h3>
                <p className="text-sm text-gray-400">📅 {tournament.date}</p>
                {/* <p className={`text-sm font-semibold ${statusColor[tournament.status]}`}>
                  Estado: {tournament.status}
                </p> */}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/tournaments/${tournament.id}`)}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm"
                >
                  Ver detalles
                </button>
                {tournament.editable && (
                  <button
                    onClick={() => navigate(`/tournaments/${tournament.id}/edit`)}
                    className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded text-sm text-black"
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTournamentsPage;
