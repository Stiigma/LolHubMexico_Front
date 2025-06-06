import axios from "axios";


export const getUserById = async (idUser: number) => {
  const response = await axios.get(`http://localhost:5022/api/Users/by-id`, {
    params: { idUser },
  });
  console.log(response.data.UserDTO)
  return response.data; // Asume que retorna { username, ... }
};


export const getPlayerById = async (idUser: number) => {
    const response = await axios.get(`http://localhost:5022/api/Player/by-user`, {
        params: {idUser},

    })
    return response.data;
}