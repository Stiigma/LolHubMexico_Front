import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  getMatchDetailByScrim, getScrimDetailFull, getScrimLogById, type ScrimLogWithAnalysis } from "../services/ScrimService";
import type { ScrimDetail } from "../types/ScrimDetail";
import TeamStatsPanel from "../layout/TeamStatsPanel";
import type { MatchDetail } from "../types/MatchDetail";
import type { Team } from "@/feactures/teams/types/Team";
import {  getTeambyId } from "@/feactures/teams/services/teamService";
import MatchSummary from "../components/MatchSummary";
import { getPlayerById } from "@/feactures/user/services/userService";
import LogModal from "../components/LogModal";

const ScrimDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [dataReady, setDataReady] = useState(false);
    const [scrimDetail, setScrimDetail] = useState<ScrimDetail | null>(null);
    const [matchDetail, setMatchDetail] = useState<MatchDetail | null>(null);
    const [logAnalyze, setLogAnalyze] = useState<ScrimLogWithAnalysis | null>(null);
    const [team1, setTeam1] = useState<Team | null>(null);
    const [team2, setTeam2] = useState<Team | null>(null);
    const [puuidToSummonerNameMap, setPuuidToSummonerNameMap] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [isLogModalOpen, setIsLogModalOpen] = useState(false); // Estado del modal

    useEffect(() => {
    const fetchData = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const scrimDetailData = await getScrimDetailFull(Number(id));
                setScrimDetail(scrimDetailData);

                const matchData = await getMatchDetailByScrim(Number(id));
                setMatchDetail(matchData);

                const fetchedTeam1 = scrimDetailData?.scrim.idTeam1
                    ? await getTeambyId(scrimDetailData.scrim.idTeam1)
                    : null;
                setTeam1(fetchedTeam1);

                const fetchedTeam2 = scrimDetailData?.scrim.idTeam2
                    ? await getTeambyId(scrimDetailData.scrim.idTeam2)
                    : null;
                setTeam2(fetchedTeam2);

                const fetchedLog = await getScrimLogById(Number(id));
                setLogAnalyze(fetchedLog);

                const map: Record<string, string> = {};
                if (!scrimDetailData) return;

                const allPlayers = [
                    ...(scrimDetailData.team1Players || []),
                    ...(scrimDetailData.team2Players || []),
                ];

                for (const player of allPlayers) {
                    let realPlayer = await getPlayerById(player.idUser);
                    if (realPlayer.puuid && realPlayer.summonerName) {
                        map[realPlayer.puuid] = realPlayer.summonerName;
                    }
                }

                setPuuidToSummonerNameMap(map);

                // ✅ Verificación de datos cargados
                if (
                    scrimDetailData &&
                    matchData &&
                    fetchedLog &&
                    fetchedTeam1 &&
                    fetchedTeam2 &&
                    Object.keys(map).length > 0
                ) {
                    console.log("✅ Todos los datos están cargados correctamente:");
                    console.log("ScrimDetail:", scrimDetailData);
                    console.log("MatchDetail:", matchData);
                    console.log("LogAnalyze:", fetchedLog);
                    console.log("Team1:", fetchedTeam1);
                    console.log("Team2:", fetchedTeam2);
                    console.log("PUUID ↔ Summoner Map:", map);

                    setDataReady(true);
                }

            } catch (error) {
                console.error("Error cargando datos del scrim:", error);
                setScrimDetail(null);
                setMatchDetail(null);
                setTeam1(null);
                setTeam2(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Cargando datos del scrim...</div>;
    }

    if (!scrimDetail || !matchDetail) {
        return <div>No se pudieron cargar los datos del scrim o del partido.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-center mb-2">
                Scrim: {scrimDetail.scrim.tittle}
            </h1>
            <p className="text-center text-gray-600 mb-6">
                Fecha programada: {new Date(scrimDetail.scrim.scheduled_date).toLocaleString("es-MX")}
            </p>

            <div className="text-center mb-6">
                <button
                    onClick={() => setIsLogModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                    Ver Análisis de Partida
                </button>
            </div>

            {matchDetail && scrimDetail.scrim && (
                <MatchSummary
                    team1={team1!}
                    team2={team2!}
                    detailMatch={matchDetail}
                    scrimDTO={scrimDetail.scrim}
                />
            )}

            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-12 justify-items-center">
                <TeamStatsPanel
                    teamName={scrimDetail.team1Name}
                    teamLogo={scrimDetail.team1Logo}
                    scrim={scrimDetail.scrim}
                    players={scrimDetail.team1Players}
                />
                <TeamStatsPanel
                    teamName={scrimDetail.team2Name}
                    teamLogo={scrimDetail.team2Logo}
                    scrim={scrimDetail.scrim}
                    players={scrimDetail.team2Players}
                />
            </div>

            {dataReady && (
                <LogModal
                    isOpen={isLogModalOpen}
                    onClose={() => setIsLogModalOpen(false)}
                    geminiAnalysis={logAnalyze?.geminiAnalysis!}
                    team1={team1}
                    team2={team2}
                    puuidToSummonerNameMap={puuidToSummonerNameMap}
                />
            )}
        </div>
    );
};

export default ScrimDetailPage;