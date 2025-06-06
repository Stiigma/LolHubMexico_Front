import axios from "axios";
import type { TeamInvitationDTO } from "../types/TeamInvitations";
import type { JoinTeamDTO } from "../types/JoinTeamDTO";

const API_URL = "http://localhost:5022/api/TeamInvitation";

export const getMyInvitations = async (idUser: number): Promise<TeamInvitationDTO[]> => {
  const response = await axios.get(`${API_URL}/my-invite`, {
    params: { idUser },
  });
  console.log(response.data.invitation);
  return response.data.invitation; // porque estás retornando { success, invitation }
};


export const respondToInvitation = async (dto: JoinTeamDTO) => {
  try {
    const response = await axios.post(`${API_URL}/joinTeam`, dto, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al enviar la respuesta a la invitación:", error);
    throw error;
  }
}