import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import Card from '../../../components/ui/Card';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 min-h-screen text-white bg-gradient-to-br from-gray-900 via-blue-900 to-sky-800">
      <main className="p-4 sm:p-6 lg:p-10 space-y-6">
        <HeroBanner />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Equipos */}
          <div onClick={() => navigate('/teams/browser')} className="cursor-pointer">
            <Card title="Equipos Destacados" image="/assets/Home/teams.png">
              Explora los equipos mejor posicionados.
            </Card>
          </div>

          {/* Scrims */}
          <div onClick={() => navigate('/scrims')} className="cursor-pointer">
            <Card title="Scrims" image="/assets/scrims.png">
              Checa las scrims activas.
            </Card>
          </div>

          {/* Feed */}
          <div onClick={() => navigate('/feed')} className="cursor-pointer">
            <Card title="Feed" image="/assets/Home/feed.png">
              Últimas noticias, actualizaciones y más.
            </Card>
          </div>

          {/* Mi progreso */}
          <div onClick={() => navigate('/stats')} className="cursor-pointer">
            <Card title="Mi progreso" image="/assets/Home/stats.png">
              Revisa tu rendimiento y partidas recientes.
            </Card>
          </div>

          {/* Torneos */}
          <div
            onClick={() => navigate('/tournaments')}
            className="md:col-span-2 flex justify-center cursor-pointer"
          >
            <Card title="Torneos" image="/assets/Home/tournaments.png">
              Participa en eventos competitivos.
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;






