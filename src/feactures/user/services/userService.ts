import axios from "axios";
import { API_URL } from "@/core/utils/API_URL";
import type { UserDTO } from "@/shared/types/User/UserDTO";

export const getUserById = async (idUser: number) => {
  const response = await axios.get(`${API_URL}/api/Users/by-id/`, {
    params: { idUser },
  });
  console.log(response.data.UserDTO)
  return response.data; // Asume que retorna { username, ... }
};


export const getPlayerById = async (idUser: number) => {
    const response = await axios.get(`${API_URL}/api/Player/by-user`, {
        params: {idUser},

    })
    return response.data;
}

export const updateUserProfile = async (user: UserDTO) => {
  return await axios.put(`${API_URL}/api/Users/update-user`, null, {
    params: {
      idUser: user.idUser,
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      fechaRegistro: user.fechaRegistro,
      phoneNumber: user.phoneNumber,
      nacionality: user.nacionality,
      role: user.role
    }
  });
};