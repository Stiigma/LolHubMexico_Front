import axios from "axios";
import type { TeamInvitationDTO } from "../types/TeamInvitations";
import type { JoinTeamDTO } from "../types/JoinTeamDTO";
import { API_URL } from "@/core/utils/API_URL";

export const getMyInvitations = async (idUser: number): Promise<TeamInvitationDTO[]> => {
  const response = await axios.get(`${API_URL}/api/TeamInvitation/my-invite`, {
    params: { idUser },
  });
  console.log(response.data.invitation);
  return response.data.invitation; // porque estás retornando { success, invitation }
};


export const respondToInvitation = async (dto: JoinTeamDTO) => {
  try {
    const response = await axios.post(`${API_URL}/api/TeamInvitation/joinTeam`, dto, {
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