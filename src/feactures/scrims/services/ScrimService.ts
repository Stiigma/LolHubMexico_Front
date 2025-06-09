import axios from "axios";
import { API_URL } from "@/core/utils/API_URL";
import type { ScrimPDTO } from "../types/ScrimPDTO";
import type { ScrimEnriched } from "../types/ScrimEnriched";
import { getTeambyId } from "@/feactures/teams/services/teamService";
import { getUserById } from "@/feactures/user/services/userService";


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