import React from 'react';

const CompletedScrimDetailPage: React.FC = () => {
  const scrim = {
    title: 'Practice contra Los Chacales',
    date: '2025-05-30',
    result: 'Ganado',
    teamName: 'Team Alpha',
    players: [
      {
        name: 'JungleGod',
        role: 'Jungle',
        championIcon: '/assets/champions/kayn.png',
        kda: '8 / 2 / 10',
        cs: 155,
        damage: 24000,
        participation: '65%',
      },
      {
        name: 'TopTank',
        role: 'Top',
        championIcon: '/assets/champions/malphite.png',
        kda: '2 / 4 / 14',
        cs: 110,
        damage: 12000,
        participation: '60%',
      },
      {
        name: 'MidBoss',
        role: 'Mid',
        championIcon: '/assets/champions/ahri.png',
        kda: '10 / 3 / 5',
        cs: 180,
        damage: 28000,
        participation: '75%',
      },
      {
        name: 'ADC123',
        role: 'ADC',
        championIcon: '/assets/champions/jhin.png',
        kda: '6 / 1 / 8',
        cs: 210,
        damage: 26000,
        participation: '70%',
      },
      {
        name: 'Supporter',
        role: 'Support',
        championIcon: '/assets/champions/nautilus.png',
        kda: '1 / 5 / 18',
        cs: 20,
        damage: 5000,
        participation: '80%',
      },
    ],
  };

  return (
    <div className="text-white px-8 py-6">
      <h1 className="text-3xl font-bold mb-4">{scrim.title}</h1>
      <p className="text-gray-300 mb-4">Fecha: {scrim.date}</p>
      <p className="mb-8 text-green-400 font-semibold">Resultado: {scrim.result}</p>

      <h2 className="text-2xl font-bold mb-4">Desempeño de {scrim.teamName}</h2>

      <div className="space-y-4">
        {scrim.players.map((player, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={player.championIcon}
                alt={player.name}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <p className="font-semibold text-lg">{player.name}</p>
                <p className="text-sm text-gray-400">{player.role}</p>
              </div>
            </div>

            <div className="text-sm text-right">
              <p><strong>KDA:</strong> {player.kda}</p>
              <p><strong>CS:</strong> {player.cs}</p>
              <p><strong>Daño:</strong> {player.damage.toLocaleString()} 🔥</p>
              <p><strong>Participación:</strong> {player.participation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedScrimDetailPage;
