import React from "react";
import type { PlayerStats } from "@/feactures/user/types/PlayerStats";
import PlayerStatsCard from "../components/PlayerStatsCard";
import type { ScrimPDTO } from "../types/ScrimPDTO";
interface TeamStatsPanelProps {
    teamName: string;
    teamLogo: string;
    players: PlayerStats[]; // Arreglo de jugadores
    scrim: ScrimPDTO;
}
const TeamStatsPanel: React.FC<TeamStatsPanelProps> = ({ teamName, teamLogo, players, scrim }) => {
    return (
        // Mantener 'max-w-md' para limitar el ancho de cada TeamStatsPanel.
        // Quitamos 'mx-auto' de aquí, ya que el posicionamiento será manejado por el padre
        // con 'justify-self-start' y 'justify-self-end'.
        <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-3 border-2 border-indigo-700"> {/* p-3 */}
            {/* Encabezado del equipo */}
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-indigo-700">
                <img
                    src={teamLogo}
                    alt={`${teamName} logo`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <h2 className="text-xl font-bold text-white truncate">{teamName}</h2>
            </div>

            {/* Lista de tarjetas de jugadores */}
            <div className="flex flex-col gap-2">
                {players.length > 0 ? (
                    players.map((player) => (
                        <PlayerStatsCard
                            key={player.userName}
                            player={player}
                            scrimStatus={scrim.status}
                        />
                    ))
                ) : (
                    <p className="text-gray-400 text-center text-sm">No hay jugadores registrados para este equipo.</p>
                )}
            </div>
        </div>
    );
};

export default TeamStatsPanel;