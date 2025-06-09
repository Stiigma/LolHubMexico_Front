import axios from "axios";
import { API_URL } from "@/core/utils/API_URL";
import type { ScrimPDTO } from "../types/ScrimPDTO";
import type { ScrimEnriched } from "../types/ScrimEnriched";
import { getTeambyId } from "@/feactures/teams/services/teamService";
import { getUserById } from "@/feactures/user/services/userService";
import type { PlayerStats } from "@/feactures/user/types/PlayerStats";
import type { ScrimDetail } from "../types/ScrimDetail";


export const getScrimPending = async () => {
  const response = await axios.get(`${API_URL}/api/Scrim/get-pending`, {
    params: {  },
  });
  console.log(response.data)
  return response.data; // Asume que retorna { username, ... }
};

export const getScrimEnriched = async (scrim: ScrimPDTO): Promise<ScrimEnriched | null> => {
  const team1 = await getTeambyId(scrim.idTeam1);
  let team2 = null
  if(scrim.status != 0){
    team2 = await getTeambyId(scrim.idTeam2);
  }
  
  if(!team1)
    return null
  
  const creator = await getUserById(team1.idCapitan);
  const descripcion = `Scrim Creada por ${creator.userName}`;
  // Traducción del status numérico a texto
  const statusText =
    scrim.status === 0
      ? "Disponible"
      : scrim.status === 1
      ? "Ocupado"
      : "Finalizado";

  return {
    scrimPDTO: scrim,
    teamName1: team1?.teamName || "Equipo no encontrado",
    teamName2: team2?.teamName || "Pendiente por confirmar",
    statusString: statusText,
    logoTeam1: team1.teamLogo,
    createdby: creator.userName,
    descripcion: descripcion,
  };
}

export const getAllScrimsEnriched = async (): Promise<ScrimEnriched[]> => {
  try {
    const scrims = await getScrimPending(); // retorna ScrimPDTO[]
    const enrichedPromises = scrims.map((scrim: ScrimPDTO) =>
      getScrimEnriched(scrim)
    );

    const enrichedResults = await Promise.all(enrichedPromises);

    // Filtrar los que son null (por fallos en getTeam o getUser)
    return enrichedResults.filter(
      (scrim): scrim is ScrimEnriched => scrim !== null
    );
  } catch (error) {
    console.error("Error al obtener scrims enriquecidos:", error);
    return [];
  }
};

export const getScrimPlayers = async (idScrim: number, idTeam: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/Scrim/get-Summoners-pending`, {
      params: { idScrim, idTeam },
    });
    return response.data; // Lista de UserLinkDTO
  } catch (error) {
    console.error("Error al obtener jugadores del scrim:", error);
    return [];
  }
};

export const getScrimDetailFull = async (idScrim: number): Promise<ScrimDetail | null> => {
  try {
    // Obtener la scrim
    const scrim = await getScrimById(idScrim);
    if (!scrim) return null;

    // Obtener info de los equipos
    const [team1, team2] = await Promise.all([
      getTeambyId(scrim.idTeam1),
      getTeambyId(scrim.idTeam2),
    ]);

    if (!team1 || !team2) return null;

    // Obtener todos los jugadores con sus stats
    const allPlayers: any[] = await getScrimPlayerStats(idScrim);

    // Filtrar por equipo
    const team1Players = allPlayers.filter((p) => p.idTeam === scrim.idTeam1);
    const team2Players = allPlayers.filter((p) => p.idTeam === scrim.idTeam2);

    // Devolver la estructura completa
    return {
      scrim,
      team1Name: team1.teamName,
      team1Logo: team1.teamLogo,
      team1Players,
      team2Name: team2.teamName,
      team2Logo: team2.teamLogo,
      team2Players
    };
  } catch (error) {
    console.error("Error al construir ScrimDetail:", error);
    return null;
  }
};



export const getScrimPlayerStats = async (idScrim: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/Scrim/details/by-id`, {
      params: { idScrim },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas de los jugadores del scrim:", error);
    return [];
  }
};


export const getScrimById = async (idScrim: number): Promise<ScrimPDTO | null> => {
  try {
    const response = await axios.get(`${API_URL}/api/Scrim/by-id`, {
      params: { idScrim },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener scrim por ID:", error);
    return null;
  }
};



