import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScrimCard from '../components/ScrimCard';

const BrowseScrimsPage: React.FC = () => {
  const navigate = useNavigate();

  // Lista estática de scrims
  const scrims = [
    {
      id: 1,
      teamName: 'RIP Top Lane',
      playerIcons: [
        '/assets/champions/fiora.png',
        '/assets/champions/ornn.png',
        '/assets/champions/lucian.png',
        '/assets/champions/nami.png',
        '/assets/champions/zed.png',
      ],
      gamestyle: 'Pick',
      scalingLevel: 'medium',
    },
    {
      id: 2,
      teamName: 'Frog and Friends',
      playerIcons: [
        '/assets/champions/braum.png',
        '/assets/champions/leesin.png',
        '/assets/champions/lux.png',
        '/assets/champions/tahmkench.png',
        '/assets/champions/katarina.png',
      ],
      gamestyle: 'Split',
      scalingLevel: 'high',
    },
    {
      id: 3,
      teamName: 'Midnight Ganks',
      playerIcons: [
        '/assets/champions/nocturne.png',
        '/assets/champions/syndra.png',
        '/assets/champions/jhin.png',
        '/assets/champions/karma.png',
        '/assets/champions/shen.png',
      ],
      gamestyle: 'Engage',
      scalingLevel: 'low',
    },
  ];

  return (
    <div className="text-white px-8 py-6 space-y-6">
      <h1 className="text-3xl font-bold">Explorar Scrims Disponibles</h1>

      {scrims.map((scrim) => (
        <ScrimCard
          key={scrim.id}
          teamName={scrim.teamName}
          playerIcons={scrim.playerIcons}
          gamestyle={scrim.gamestyle}
          scalingLevel={scrim.scalingLevel as 'low' | 'medium' | 'high'}
          onClick={() => navigate(`/scrims/${scrim.id}`)}
        />
      ))}
    </div>
  );
};

export default BrowseScrimsPage;
