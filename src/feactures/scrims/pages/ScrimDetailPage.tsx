import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  getMatchDetailByScrim, getScrimDetailFull } from "../services/ScrimService";
import type { ScrimDetail } from "../types/ScrimDetail";
import TeamStatsPanel from "../layout/TeamStatsPanel";
import type { MatchDetail } from "../types/MatchDetail";
import type { Team } from "@/feactures/teams/types/Team";
import {  getTeambyId } from "@/feactures/teams/services/teamService";
import MatchSummary from "../components/MatchSummary";

const ScrimDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [scrimDetail, setScrimDetail] = useState<ScrimDetail | null>(null);
    const [matchDetail, setMatchDetail] = useState<MatchDetail | null>(null);
    const [team1, setTeam1] = useState<Team | null>(null);
    const [team2, setTeam2] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true); // Nuevo estado para indicar si los datos están cargando

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            setLoading(true); // Indicar que la carga ha comenzado

            try {
                const scrimDetailData = await getScrimDetailFull(Number(id));
                console.log("Datos de ScrimDetail:", scrimDetailData); // Log para depuración
                setScrimDetail(scrimDetailData);

                const matchData = await getMatchDetailByScrim(Number(id));
                console.log("Datos de Match:", matchData); // Log para depuración
                setMatchDetail(matchData);

                let fetchedTeam1: Team | null = null;
                if (scrimDetailData?.scrim.idTeam1) {
                    fetchedTeam1 = await getTeambyId(scrimDetailData.scrim.idTeam1);
                    console.log("Datos de Equipo 1:", fetchedTeam1); // Log para depuración
                    setTeam1(fetchedTeam1); // Actualiza el estado team1
                } else {
                    setTeam1(null); // Asegura que team1 sea null si no hay idTeam1
                }

                let fetchedTeam2: Team | null = null;
                if (scrimDetailData?.scrim.idTeam2) {
                    fetchedTeam2 = await getTeambyId(scrimDetailData.scrim.idTeam2);
                    console.log("Datos de Equipo 2:", fetchedTeam2); // Log para depuración
                    setTeam2(fetchedTeam2); // Actualiza el estado team2
                } else {
                    setTeam2(null); // Asegura que team2 sea null si no hay idTeam2
                }

            } catch (error) {
                console.error("Error cargando datos del scrim:", error);
                // Aquí podrías querer setear los estados a null o mostrar un mensaje de error
                setScrimDetail(null);
                setMatchDetail(null);
                setTeam1(null);
                setTeam2(null);
            } finally {
                setLoading(false); // Indicar que la carga ha terminado
            }
        };

        fetchData();
        // Las dependencias del useEffect aseguran que se ejecute cuando `id` cambie.
        // No necesitas añadir team1 o team2 aquí si solo se están estableciendo dentro de este efecto.
    }, [id]);

    // Opcional: Un useEffect para ver los valores actualizados de team1 y team2
    // Esto se ejecutará cada vez que team1 o team2 cambien después de un render.
    useEffect(() => {
        console.log("Estado actual de team1 (después de render):", team1);
    }, [team1]);

    useEffect(() => {
        console.log("Estado actual de team2 (después de render):", team2);
    }, [team2]);

    // Lógica para mostrar estado de carga o datos
    if (loading) {
        return <div>Cargando datos del scrim...</div>;
    }

    // Si no hay scrimDetail después de cargar, quizás hubo un error o no se encontró
    if (!scrimDetail || !matchDetail) {
        return <div>No se pudieron cargar los datos del scrim o del partido.</div>;
    }

    // Ahora que hemos pasado los estados de carga y error, podemos asegurar que
    // scrimDetail y matchDetail no son null.
    // team1 y team2 pueden ser null si getTeambyId no encontró un equipo o si no había idTeamX.

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-center mb-2">
                Scrim: {scrimDetail.scrim.tittle}
            </h1>
            <p className="text-center text-gray-600 mb-6">
                Fecha programada: {new Date(scrimDetail.scrim.scheduled_date).toLocaleString("es-MX")}
            </p>

            {/* Renderiza MatchSummary solo si matchDetail y scrimDetail.scrim existen */}
            {matchDetail && scrimDetail.scrim && (
                <MatchSummary
                    team1={team1!}
                    team2={team2!}
                    detailMatch={matchDetail}
                    scrimDTO={scrimDetail.scrim}
                />
            )}

             {/* Contenedor de los paneles de estadísticas de equipo (lado a lado) */}
           <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-12 justify-items-center"> {/* justify-items-center para centrar las columnas */}
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
        </div>
    );
};

export default ScrimDetailPage;