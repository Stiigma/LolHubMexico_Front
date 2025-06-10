import React from "react";
import type { PlayerStats } from "@/feactures/user/types/PlayerStats";

interface PlayerStatsCardProps {
    player: PlayerStats;
    scrimStatus: number; // 2: en espera, 3: pre-partida (con campeón/carril), 4: post-partida (con stats completos)
}

const PlayerStatsCard: React.FC<PlayerStatsCardProps> = ({ player, scrimStatus }) => {
    const itemIcons = scrimStatus === 4 && player.items
        ? player.items.split(",").map((item, index) => (
            <img
                key={index}
                src={`/items/${item.trim()}.png`}
                alt={`item-${item.trim()}`}
                className="w-6 h-6 object-cover rounded-sm border border-gray-700"
            />
        ))
        : null;

    const kda = player.kills !== undefined && player.deaths !== undefined && player.assists !== undefined
        ? `${player.kills}/${player.deaths}/${player.assists}`
        : 'N/A';

    return (
        <div className="w-full bg-gray-800 rounded-md shadow-md p-3 flex items-center justify-between gap-3 border border-blue-700 hover:border-blue-500 transition-all duration-200">
            {/* Sección de perfil y nombres */}
            <div className="flex items-center gap-3 flex-shrink-0">
                <img
                    src={player.profilePicture || "/default-avatar.png"}
                    alt="perfil"
                    className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
                />
                <div className="flex flex-col text-white">
                    <p className="font-bold text-base truncate max-w-[90px]">{player.userName}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[90px]">Inv.: {player.summonerName}</p>
                </div>
            </div>

            {/* Información dinámica según el estado del scrim */}
            <div className="flex-1 text-sm text-gray-300">
                {scrimStatus === 2 && (
                    <p className="text-blue-400 animate-pulse text-center w-full">En espera...</p>
                )}

                {scrimStatus === 3 && (
                    <div className="grid grid-cols-1 gap-y-1 w-full">
                        <p className="flex items-center gap-1"><span className="text-blue-400">🏆</span> Champ: <span className="font-semibold">{player.championName || 'N/A'}</span></p>
                        <p className="flex items-center gap-1"><span className="text-blue-400">🛣️</span> Lane: <span className="font-semibold">{player.carril || 'N/A'}</span></p>
                    </div>
                )}

                {scrimStatus === 4 && (
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 w-full text-white">
                        <p className="flex items-center gap-1"><span className="text-blue-400">⬆️</span> Lv: <span className="font-semibold">{player.nivel || 'N/A'}</span></p>
                        <p className="flex items-center gap-1"><span className="text-blue-400">⚔️</span> KDA: <span className="font-semibold">{kda}</span></p>
                        <p className="flex items-center gap-1"><span className="text-blue-400">💰</span> Gold: <span className="font-semibold">{player.goldEarned || 'N/A'}</span></p>
                        <p className="flex items-center gap-1"><span className="text-blue-400">🌾</span> Farm: <span className="font-semibold">{player.farm || 'N/A'}</span></p>
                        <p className="flex items-center gap-1"><span className="text-blue-400">👁️</span> Vis: <span className="font-semibold">{player.visionScore || 'N/A'}</span></p>
                        <p className="flex items-center gap-1"><span className="text-blue-400">%</span> Dmg: <span className="font-semibold">{player.teamDamagePercentage || 'N/A'}</span></p>
                    </div>
                )}
            </div>

            {scrimStatus === 4 && itemIcons && (
                <div className="flex-shrink-0 flex flex-col items-end w-auto min-w-[50px]">
                    <span className="font-semibold text-gray-300 text-xs mb-1">Items:</span>
                    <div className="flex flex-wrap gap-0.5 justify-end">
                        {itemIcons}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayerStatsCard;