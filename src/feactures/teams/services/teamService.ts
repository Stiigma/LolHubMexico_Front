import axios from "axios";
import type { Team } from "../types/Team";
import type { CreateTeamInvitationDTO } from "../types/CreateTeamInvitationDTO";

const API_URL = "http://localhost:5022/api/Team";

interface CreateTeamDTO {
  teamName: string;
  idCapitan: number;
}

export const createTeam = async (data: CreateTeamDTO) => {
    console.log("Servicio...");
  const response = await axios.post(`${API_URL}/create-team`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Se utilizo el serivcio");
  return response.data;
};


export const getMyTeam = async (idUser: number): Promise<Team> => {
  try {
    const response = await axios.get(`${API_URL}/my-team`, {
      params: { idUser },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el equipo:", error);
    throw error;
  }
};


// src/features/teams/services/teamService.ts
export const searchUsersByName = async (query: string) => {
  try {
    const response = await axios.get("http://localhost:5022/api/Users/search", {
      params: { query },
    });
    return response.data; // ← debe ser un arreglo de UserSearchDTO
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    throw error;
  }
};


export const inviteUserToTeam = async (dto: CreateTeamInvitationDTO) => {
  try {
    const response = await axios.post("http://localhost:5022/api/TeamInvitation/invite", dto);
    return response.data;
  } catch (error) {
    console.error("Error al enviar la invitación:", error);
    throw error;
  }
};