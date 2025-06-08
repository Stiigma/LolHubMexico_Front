import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyScrimsPage: React.FC = () => {
  const navigate = useNavigate();

  const activeScrims = [
    {
      id: 1,
      title: 'Scrim de Midlaners',
      date: '2025-06-12',
      status: 'pending',
      opponent: null,
    },
    {
      id: 2,
      title: 'Top Lane 1v1',
      date: '2025-06-14',
      status: 'in_progress',
      opponent: 'Team Nexus',
    },
  ];

  const completedScrims = [
    {
      id: 3,
      title: 'Practice contra Los Chacales',
      date: '2025-05-30',
      status: 'completed',
      result: 'Ganado',
    },
    {
      id: 4,
      title: 'Bot Lane Clash',
      date: '2025-05-28',
      status: 'completed',
      result: 'Perdido',
    },
  ];

  const renderStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="text-yellow-400">Pendiente</span>;
      case 'in_progress':
        return <span className="text-blue-400">En proceso</span>;
      case 'completed':
        return <span className="text-green-400">Completado</span>;
      default:
        return <span className="text-gray-400">Desconocido</span>;
    }
  };

  return (
    <div className="text-white px-8 py-6">
      <h2 className="text-3xl font-bold mb-4">Mis Scrims Activos</h2>
      {activeScrims.length === 0 ? (
        <p className="text-gray-400">Aún no estás inscrito en ningún scrim.</p>
      ) : (
        <div className="space-y-4">
          {activeScrims.map((scrim) => (
            <div
              key={scrim.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-start"
            >
              <div>
                <h3 className="text-xl font-semibold">{scrim.title}</h3>
                <p>Fecha: {scrim.date}</p>
                <p>Estado: {renderStatusLabel(scrim.status)}</p>
                {!scrim.opponent && scrim.status === 'pending' && (
                  <p className="text-yellow-300 mt-2">Aún sin equipo rival asignado.</p>
                )}
              </div>

              {scrim.status === 'pending' && (
                <button
                  onClick={() => navigate(`/scrims/${scrim.id}/edit`)}
                  className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded text-sm text-black font-semibold h-fit"
                >
                  Editar
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <hr className="my-8 border-gray-600" />

      <h2 className="text-3xl font-bold mb-4">Historial de Scrims</h2>
      {completedScrims.length === 0 ? (
        <p className="text-gray-400">No tienes scrims completados.</p>
      ) : (
        <div className="space-y-4">
          {completedScrims.map((scrim) => (
            <div
              key={scrim.id}
              onClick={() => navigate(`/scrims/history/${scrim.id}`)}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer transition"
            >
              <h3 className="text-xl font-semibold">{scrim.title}</h3>
              <p>Fecha: {scrim.date}</p>
              <p>Estado: {renderStatusLabel(scrim.status)}</p>
              <p>Resultado: {scrim.result}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyScrimsPage;
