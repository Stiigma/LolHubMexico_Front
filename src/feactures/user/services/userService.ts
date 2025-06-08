import axios from "axios";
import { API_URL } from "@/core/utils/API_URL";

export const getUserById = async (idUser: number) => {
  const response = await axios.get(`${API_URL}/api/Users/by-id`, {
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