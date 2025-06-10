// src/features/players/pages/PlayerDetail.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Ajusta la ruta a tu userService.ts
import {
  getUserById,
  getPlayerById,
} from "@/feactures/user/services/userService";
// Importa tus DTOs existentes
import type { PlayerDTO } from "@/feactures/user/types/PlayerDTO";
import type { UserDTO } from "@/shared/types/User/UserDTO"; // Asegúrate de que esta ruta sea correcta para tu UserDTO

// Interfaz para la información combinada que mostraremos en el frontend
interface PlayerCombinedDetail {
  idUser: number;
  userName: string; // Del UserDTO
  email: string; // Del UserDTO
  summonerName: string; // Del PlayerDTO
  profilePicture?: string; // Del PlayerDTO
  mainRole?: string; // Del PlayerDTO
  level?: number; // Del PlayerDTO
  idPlayer?: number; // Del PlayerDTO
  puuid?: string; // Del PlayerDTO
  // Puedes añadir más campos aquí si UserDTO o PlayerDTO los contienen y quieres mostrarlos
  // Por ejemplo, si UserDTO tiene 'fullName' o PlayerDTO tiene 'rank'
}

const PlayerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID del usuario de la URL
  const userId = Number(id); // Convertir a número

  const [playerCombinedDetail, setPlayerCombinedDetail] =
    useState<PlayerCombinedDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("ID de usuario no proporcionado.");
      setLoading(false);
      return;
    }

    const fetchPlayerFullDetails = async () => {
      try {
        // 1. Obtener la información del usuario (contiene userName y email)
        const userResponse = await getUserById(userId);
        // Asume que la respuesta es { UserDTO: ... } y extrae el UserDTO
        const user: UserDTO = userResponse.UserDTO;

        // 2. Obtener la información específica del jugador de LoL (PlayerDTO)
        const player: PlayerDTO = await getPlayerById(userId);

        if (user && player) {
          setPlayerCombinedDetail({
            idUser: userId,
            userName: user.userName,
            email: user.email,
            summonerName: player.summonerName,
            profilePicture: player.profilePicture,
            mainRole: player.mainRole,
            level: player.level,
            idPlayer: player.idPlayer,
            puuid: player.puuid,
          });
        } else {
          setError("No se encontraron todos los detalles para este jugador.");
        }
      } catch (e) {
        console.error("Error fetching player details:", e);
        setError("Error al cargar los detalles del jugador.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerFullDetails();
  }, [userId]); // Las dependencias deben incluir userId para re-fetch si el ID cambia

  if (loading)
    return (
      <div className="p-6 text-white text-center">
        Cargando detalles del jugador...
      </div>
    );
  if (error)
    return <div className="p-6 text-red-500 text-center">Error: {error}</div>;
  if (!playerCombinedDetail)
    return (
      <div className="p-6 text-white text-center">
        No se encontraron detalles para este jugador.
      </div>
    );

  // Renderiza la información del jugador con la estética que manejamos
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Sección superior y banner (similar a TeamDetail) */}
      <header
        className="relative h-64 bg-center bg-cover rounded-xl shadow-lg"
        // Asegúrate de tener esta imagen en tus assets o usa un placeholder
        style={{
          backgroundImage: 'url("/assets/player-banner-placeholder.png")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80 rounded-xl" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <img
            src={
              playerCombinedDetail.profilePicture ||
              "/assets/default-avatar.png"
            }
            alt={playerCombinedDetail.summonerName || "Jugador"}
            className="w-32 h-32 rounded-full border-4 border-violet-700 object-cover shadow-xl"
          />
          <h1 className="text-4xl font-bold mt-4 text-white">
            {playerCombinedDetail.summonerName || "Nombre Desconocido"}
          </h1>
          <p className="text-violet-300 text-lg mt-2">
            Rol Principal: {playerCombinedDetail.mainRole || "N/A"}
          </p>
          <p className="text-gray-400 text-md mt-1">
            Nivel de Invocador: {playerCombinedDetail.level || "N/A"}
          </p>
        </div>
      </header>

      {/* Sección de detalles generales del jugador */}
      <section className="mt-12 max-w-4xl mx-auto bg-slate-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-violet-400 mb-6 border-b border-violet-600 pb-3">
          Información General
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <p className="text-gray-300">
            <span className="font-semibold text-white">
              Nombre de Usuario (App):
            </span>{" "}
            {playerCombinedDetail.userName}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Email:</span>{" "}
            {playerCombinedDetail.email}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">
              ID de Jugador (LOL):
            </span>{" "}
            {playerCombinedDetail.idPlayer || "N/A"}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">PUUID:</span>{" "}
            {playerCombinedDetail.puuid || "N/A"}
          </p>
          {/* Puedes añadir más campos aquí si UserDTO o PlayerDTO los contienen y quieres mostrarlos */}
        </div>
      </section>

      {/* Sección para el historial de partidas (PlayerStats) - Comentada por ahora */}
      {/*
        Para mostrar un historial de PlayerStats (estadísticas por partida):
        1. Tu backend necesitaría un endpoint que devuelva una LISTA de PlayerStats para un idUser.
        2. Harías una llamada a ese endpoint en este useEffect (similar a getUserById y getPlayerById).
        3. Luego, mapearías esas PlayerStats en componentes visuales (quizás tarjetas de partida,
           pero más sencillas que las de MatchHistory ya que solo son estadísticas del jugador).
        Dejaré esta sección comentada ya que aún no tenemos el endpoint ni la estructura para esto.
      */}
      {/*
      <section className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-violet-400 mb-6 border-b border-violet-600 pb-3">
          Historial de Scrims Recientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          { // playerStatsList.map((stat, index) => (
            // <div key={index} className="bg-slate-800 rounded-lg p-4 shadow-md text-gray-300">
            //   <h3 className="text-xl font-semibold text-white">{stat.championName}</h3>
            //   <p>Carril: {stat.carril}</p>
            //   <p>KDA: {stat.kills}/{stat.deaths}/{stat.assists}</p>
            //   <p>Oro: {stat.goldEarned}</p>
            //   // ... más detalles de PlayerStats
            // </div>
          // ))
          }
        </div>
      </section>
      */}
    </div>
  );
};

export default PlayerDetail;
