import type { Team } from "@/feactures/teams/types/Team";
import React from "react";
import type { MatchDetail } from "../types/MatchDetail";
import type { ScrimPDTO } from "../types/ScrimPDTO";



interface MatchSummaryProps {
  team1: Team;
  team2: Team;
  detailMatch: MatchDetail;
  scrimDTO: ScrimPDTO;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({
    team1,
    team2,
    detailMatch,
    scrimDTO,
}) => {
    // Puedes calcular el ganador aquí o pasarlo como prop ya calculada
    const winnerTeamId = detailMatch.towersTeam1 > detailMatch.towersTeam2
        ? team1.idTeam
        : detailMatch.towersTeam2 > detailMatch.towersTeam1
            ? team2.idTeam
            : null; // null si es empate o si no hay torres

    // Formatear duración de la partida a minutos y segundos (si `gameDuration` es en segundos)
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl mx-auto border-2 border-blue-700 mb-8 animate-fade-in">
            {/* Encabezado de modo y versión */}
            <div className="flex justify-between items-center text-sm text-blue-300 font-medium mb-6 px-2">
                <span className="bg-blue-800 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                    {detailMatch.gameMode}
                </span>
                <span className="text-xs">
                    Versión: <span className="font-semibold">{detailMatch.gameVersion}</span>
                </span>
            </div>

            {/* Marcador principal estilo fútbol */}
            <div className="flex justify-around items-center text-center gap-4 mb-8">
                {/* Equipo 1 */}
                <div className="flex-1 flex flex-col items-center">
                    <img
                        src={team1.teamLogo}
                        alt={team1.teamName}
                        className={`w-24 h-24 object-contain transition-transform duration-300 transform hover:scale-110 ${
                            winnerTeamId === team1.idTeam ? "ring-4 ring-yellow-400 rounded-full" : "rounded-full"
                        }`}
                    />
                    <h3 className="mt-3 text-xl font-bold truncate max-w-[120px]">{team1.teamName}</h3>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center mx-4">
                    <span className="text-6xl font-extrabold text-yellow-300 drop-shadow-lg">
                        {detailMatch.towersTeam1} - {detailMatch.towersTeam2}
                    </span>
                    {winnerTeamId === team1.idTeam && (
                        <span className="text-green-400 text-sm font-semibold mt-1 animate-pulse">¡Ganadores: {team1.teamName}!</span>
                    )}
                    {winnerTeamId === team2.idTeam && (
                        <span className="text-green-400 text-sm font-semibold mt-1 animate-pulse">¡Ganadores: {team2.teamName}!</span>
                    )}
                    {winnerTeamId === null && (
                        <span className="text-gray-400 text-sm font-semibold mt-1">Empate</span>
                    )}
                </div>

                {/* Equipo 2 */}
                <div className="flex-1 flex flex-col items-center">
                    <img
                        src={team2.teamLogo}
                        alt={team2.teamName}
                        className={`w-24 h-24 object-contain transition-transform duration-300 transform hover:scale-110 ${
                            winnerTeamId === team2.idTeam ? "ring-4 ring-yellow-400 rounded-full" : "rounded-full"
                        }`}
                    />
                    <h3 className="mt-3 text-xl font-bold truncate max-w-[120px]">{team2.teamName}</h3>
                </div>
            </div>

            {/* Duración de la partida */}
            <div className="text-center text-md text-blue-200 mt-6 pt-4 border-t border-blue-800">
                <span className="font-light">Duración de la partida: </span>
                <span className="font-bold text-lg text-yellow-200">
                    {formatDuration(detailMatch.gameDuration)}
                </span>
            </div>

            {/* Información adicional del scrim (opcional) */}
            {scrimDTO && (
                <div className="text-center text-xs text-gray-400 mt-2">
                    <p>Scrim ID: {scrimDTO.idScrim}</p>
                </div>
            )}
        </div>
    );
};

export default MatchSummary;