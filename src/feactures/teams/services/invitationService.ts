import axios from "axios";
import type { TeamInvitationDTO } from "../types/TeamInvitations";

const API_URL = "http://localhost:5022/api/TeamInvitation";

export const getMyInvitations = async (idUser: number): Promise<TeamInvitationDTO[]> => {
  const response = await axios.get(`${API_URL}/my-invite`, {
    params: { idUser },
  });

  return response.data.invitation; // porque estás retornando { success, invitation }
};
