// src/features/teams/components/ScrimCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { ScrimDetail } from "@/feactures/scrims/types/ScrimDetail";

interface ScrimCardProps {
  scrim: ScrimDetail;
  engageIconUrl: string;
  pickIconUrl: string;
}

const ScrimCard: React.FC<ScrimCardProps> = ({
  scrim,
  engageIconUrl,
  pickIconUrl,
}) => {
  const allies = scrim.team1Players.map((player) => player.championName);
  const enemies = scrim.team2Players.map((player) => player.championName);

  return (
    <Link
      key={scrim.scrim.idScrim}
      to={`/scrims/${scrim.scrim.idScrim}`}
      className="
        group
        block
        w-full max-w-5xl           // Mantenemos el ancho que ya te funciona
        h-27
        bg-gray-800/30
        rounded-2xl
        shadow-lg
        hover:shadow-xl
        hover:shadow-violet-500/50
        transition-shadow
        duration-200
        p-3                        // Mantenemos el padding p-3
        flex items-center justify-between
        flex-wrap
        cursor-pointer
      "
    >
      {/* Campeones aliados */}
      <div className="flex space-x-5 flex-grow-0 flex-shrink- mb-2 sm:mb-0">
        {allies.map((champ) => (
          <img
            key={champ}
            src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${champ}.png`}
            alt={champ}
            className="w-14 h-14 border-2 border-blue-500 object-cover transition-transform duration-200 hover:-translate-y-2" // <--- CAMBIO: w-14 h-14 y se quitó rounded-full
          />
        ))}
      </div>

      {/* Separador central */}
      <div className="flex flex-col items-center text-white space-y-2 mx-2 flex-shrink-0">
        <div className="flex space-x-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full border border-blue-500 text-blue-500">
            Ally
          </span>
          <span className="px-3 py-1 text-xs font-semibold rounded-full border border-red-500 text-red-500">
            Enemy
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <img src={engageIconUrl} alt="Engage" className="w-10 h-10" />
          <span className="text-white text-2xl font-bold">×</span>
          <img src={pickIconUrl} alt="Pick" className="w-10 h-10" />
        </div>
      </div>

      {/* Campeones enemigos */}
      <div className="flex space-x-5 flex-grow-0 flex-shrink-0 mb-2 sm:mb-0">
        {enemies.map((champ) => (
          <img
            key={champ}
            src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${champ}.png`}
            alt={champ}
            className="w-14 h-14 border-2 border-blue-500 object-cover transition-transform duration-200 hover:-translate-y-2" // <--- CAMBIO: w-14 h-14 y se quitó rounded-full
          />
        ))}
      </div>
    </Link>
  );
};

export default ScrimCard;
