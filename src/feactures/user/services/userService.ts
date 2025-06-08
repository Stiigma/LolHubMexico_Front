import axios from "axios";


export const getUserById = async (idUser: number) => {
  const response = await axios.get(`ttps://lolhubmexico.onrender.com/api/Users/by-id`, {
    params: { idUser },
  });
  console.log(response.data.UserDTO)
  return response.data; // Asume que retorna { username, ... }
};


export const getPlayerById = async (idUser: number) => {
    const response = await axios.get(`https://lolhubmexico.onrender.com/api/Player/by-user`, {
        params: {idUser},

    })
    return response.data;
}