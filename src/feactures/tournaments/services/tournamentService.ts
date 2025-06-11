import axios from "axios";
import { API_URL } from "@/core/utils/API_URL";
import type { Tournament, TournamentEnriched } from "../types/Tournament";

export const createTorneo = async (dto: Tournament): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/api/Torneo/create-torneo`, dto);
    console.log("Torneo creado correctamente:", response.data);
    return true;
  } catch (error) {
    console.error("Error al crear Torneo:", error);
    return false;
  }
};

export const getTorneosPendientes = async (): Promise<TournamentEnriched[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/Torneo/pendientes`);
    return response.data.createdTeam;;
  } catch (error) {
    console.error("Error al obtener torneos pendientes:", error);
    return [];
  }
};