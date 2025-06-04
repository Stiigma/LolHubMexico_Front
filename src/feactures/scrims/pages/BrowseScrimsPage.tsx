import React from 'react';
import ScrimCard from '../components/ScrimCard';

const mockScrims = [
  {
    id: 1,
    teamName: 'Voidwalkers',
    rank: 'Platino - Diamante',
    objective: 'Práctica seria con draft competitivo',
    date: '2025-06-15',
  },
  {
    id: 2,
    teamName: 'Jungle Control',
    rank: 'Oro - Platino',
    objective: 'Pulir macro y control de visión',
    date: '2025-06-18',
  },
  {
    id: 3,
    teamName: 'Team Eclipse',
    rank: 'Diamante - Master',
    objective: 'Scrim preparatorio para torneo',
    date: '2025-06-20',
  },
];

const BrowseScrimsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Scrims disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockScrims.map((scrim) => (
          <ScrimCard key={scrim.id} scrim={scrim} />
        ))}
      </div>
    </div>
  );
};

export default BrowseScrimsPage;
