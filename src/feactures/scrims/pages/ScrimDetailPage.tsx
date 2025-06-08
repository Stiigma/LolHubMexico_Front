import React from 'react';

const ScrimDetailPage: React.FC = () => {
  const scrim = {
    title: 'Clash de Junglas',
    date: '2025-06-15',
    time: '19:00',
    description: 'Práctica intensa entre equipos para controlar la jungla.',
    teamA: {
      name: 'Team Alpha',
      players: [
        { name: 'JungleGod', icon: '/assets/champions/junglegod.png' },
        { name: 'MidBoss', icon: '/assets/champions/midboss.png' },
        { name: 'ADC123', icon: '/assets/champions/adc123.png' },
        { name: 'Supporter', icon: '/assets/champions/supporter.png' },
        { name: 'TopTank', icon: '/assets/champions/toptank.png' },
      ],
    },
    teamB: {
      name: 'Team Omega',
      players: [
        { name: 'ShadowJungle', icon: '/assets/champions/shadowjungle.png' },
        { name: 'MageKing', icon: '/assets/champions/mageking.png' },
        { name: 'SniperADC', icon: '/assets/champions/sniperadc.png' },
        { name: 'HealBot', icon: '/assets/champions/healbot.png' },
        { name: 'ShieldTop', icon: '/assets/champions/shieldtop.png' },
      ],
    },
  };

  const TeamCard = ({ name, players }: { name: string; players: any[] }) => (
    <div className="bg-gray-900 p-5 rounded-xl flex items-center justify-between shadow-md">
      <div>
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <div className="flex gap-2">
          {players.map((player, index) => (
            <img
              key={index}
              src={player.icon}
              alt={player.name}
              title={player.name}
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
      </div>

      <div className="text-right hidden md:block">
        <p className="text-sm text-gray-400">Gamestyle</p>
        <p className="text-md font-semibold">Pick</p>
        <p className="text-sm text-gray-400 mt-1">Scaling</p>
        <div className="flex gap-1 mt-1">
          <span className="w-4 h-1 bg-orange-400 rounded"></span>
          <span className="w-4 h-1 bg-orange-400 rounded"></span>
          <span className="w-4 h-1 bg-orange-400 rounded"></span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-white px-6 py-8 space-y-6">
      <h1 className="text-3xl font-bold">{scrim.title}</h1>
      <p className="text-gray-300">📅 {scrim.date} | 🕒 {scrim.time} hrs</p>
      <p className="text-gray-400">{scrim.description}</p>

      <div className="space-y-6 mt-8">
        <TeamCard name={`Equipo A: ${scrim.teamA.name}`} players={scrim.teamA.players} />
        <TeamCard name={`Equipo B: ${scrim.teamB.name}`} players={scrim.teamB.players} />
      </div>
    </div>
  );
};

export default ScrimDetailPage;
