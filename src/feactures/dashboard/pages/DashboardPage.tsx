import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import Card from '../../../components/ui/Card';
import Sidebar from '../components/Sidebar';
import UserActionsPanel from '../components/UserActionsPanel';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-gray-900 via-blue-900 to-sky-800">
      <Sidebar />

      <div className="flex-1 relative flex flex-col lg:flex-row">
        {/* Panel del usuario (perfil + iconos) */}
        <div className="absolute top-6 right-6 z-50">
          <UserActionsPanel />
        </div>

        {/* Contenido principal con espacio a la derecha */}
        <main className="flex-1 p-6 pr-32 space-y-6">
          <HeroBanner />

          {/* Distribución en 2 columnas con última centrada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-start">
            {/* Fila 1 */}
            <div onClick={() => navigate('/teams/browser')} className="cursor-pointer">
              <Card title="Equipos Destacados" image="/assets/Home/teams.png">
                Explora los equipos mejor posicionados.
              </Card>
            </div>
            <Card title="Ranking competitivo" image="/assets/Home/ranking.png">
              Consulta las estadísticas de los mejores invocadores.
            </Card>

            {/* Fila 2 */}
            <Card title="Feed" image="/assets/Home/feed.png">
              Últimas noticias, actualizaciones y más.
            </Card>
            <Card title="Mi progreso" image="/assets/Home/stats.png">
              Revisa tu rendimiento y partidas recientes.
            </Card>

            {/* Fila 3 - tarjeta centrada */}
            <div className="md:col-span-2 flex justify-center">
              <Card title="Torneos" image="/assets/Home/tournaments.png">
                Participa en eventos competitivos.
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;



