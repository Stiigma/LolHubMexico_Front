import React from "react";
import type { PlayerStats } from "@/feactures/user/types/PlayerStats";

const PlayerStatsCard: React.FC<{ player: PlayerStats }> = ({ player }) => {
  const itemIcons = player.items.split(",").map((item, index) => (
    <img
      key={index}
      src={`/items/${item.trim()}.png`}
      alt={`item-${item.trim()}`}
      className="w-6 h-6 rounded"
    />
  ));

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full flex flex-col sm:flex-row gap-4">
      <div className="flex items-center gap-4">
        <img
          src={player.profilePicture || "/default-avatar.png"}
          alt="perfil"
          className="w-16 h-16 rounded-full border object-cover"
        />
        <div>
          <p className="font-bold text-base">{player.userName}</p>
          <p className="text-sm text-gray-600">Invocador: {player.summonerName}</p>
          <p className="text-sm text-gray-500">Campeón: {player.championName}</p>
          <p className="text-sm text-gray-500">Carril: {player.carril}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-sm text-gray-700 flex-1">
        <p><strong>Nivel:</strong> {player.nivel}</p>
        <p><strong>KDA:</strong> {player.kills}/{player.deaths}/{player.assists}</p>
        <p><strong>Oro:</strong> {player.goldEarned}</p>
        <p><strong>Farm:</strong> {player.farm}</p>
        <p><strong>Visión:</strong> {player.visionScore}</p>
        <p><strong>Daño equipo:</strong> {player.teamDamagePercentage}</p>
        <div className="col-span-2 sm:col-span-3 flex items-center gap-2 mt-2">
          <span className="font-semibold">Ítems:</span>
          <div className="flex gap-1">{itemIcons}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsCard;