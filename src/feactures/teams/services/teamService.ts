import axios from "axios";
import type { Team } from "../types/Team";
import type { CreateTeamInvitationDTO } from "../types/CreateTeamInvitationDTO";
import type { TeamMemberDTO } from "../types/TeamMemberDTO";
import { getUserById } from "@/feactures/user/services/userService";
import { getPlayerById } from "@/feactures/user/services/userService";

const API_URL = "https://lolhubmexico.onrender.com/api/Team";

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

export const updateTeam = async (data: Team) => {
  console.log("Servicio...");
  const response = await axios.put(`${API_URL}/update`, data, {
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
    console.log(response.data.team)
    return response.data;
  } catch (error) {
    console.error("Error al obtener el equipo:", error);
    throw error;
  }
};


export const getTeamMembers = async (idTeam: number): Promise<TeamMemberDTO[]> => {
  try {
    const response = await axios.get(`${API_URL}/members`, {
      params: { idTeam },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener los miembros del equipo:", error);
    throw error;
  }
};

export const getTeamMembersEnriched = async (idTeam: number): Promise<TeamMemberDTO[]> => {
  const baseMembers = await getTeamMembers(idTeam); // el original que ya tienes


  // Enriquecer cada miembro con su email y username
  const enriched = await Promise.all(
    baseMembers.map(async (member) => {
      try {
        const user = await getUserById(member.idUser);

        let player = null;
        let linkSummoner = false;

        try {
          player = await getPlayerById(member.idUser);
          linkSummoner = true;
        } catch (err) {
          // No vinculado, se mantiene linkSummoner en false
        }

        return {
          ...member,
          email: user.email,
          Username: user.userName,
          player,
          linkSummoner,
        };
      } catch (err) {
        return member; // Fallback: sin enriquecer
      }
    })
  );

  return enriched;
};


// src/features/teams/services/teamService.ts
export const searchUsersByName = async (query: string) => {
  try {
    const response = await axios.get("https://lolhubmexico.onrender.com/api/Users/search", {
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