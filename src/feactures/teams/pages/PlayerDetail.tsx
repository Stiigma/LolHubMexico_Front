// src/feactures/teams/pages/PlayerDetail.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// AJUSTE #1: Ruta para userService.ts
// Desde 'feactures/teams/pages/' para llegar a 'feactures/user/services/'
// Se necesita subir dos niveles (..) y luego bajar a 'user/services'
import { getUserById, getPlayerById } from "../../user/services/userService"; // <--- CORRECCIÓN AQUÍ

// AJUSTE #2: Ruta para PlayerDTO.ts
// Desde 'feactures/teams/pages/' para llegar a 'feactures/user/types/'
// Se necesita subir dos niveles (..) y luego bajar a 'user/types'
import type { PlayerDTO } from "../../user/types/PlayerDTO"; // <--- CORRECCIÓN AQUÍ

// La ruta para UserDTO es correcta si tu configuración de TypeScript tiene el alias "@/shared"
import type { UserDTO } from "@/shared/types/User/UserDTO";

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
}

const PlayerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const [playerCombinedDetail, setPlayerCombinedDetail] =
    useState<PlayerCombinedDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || isNaN(userId)) {
      setError("ID de usuario no proporcionado o no válido.");
      setLoading(false);
      return;
    }

    const fetchPlayerFullDetails = async () => {
      try {
        // Añadimos logs para depuración justo antes de la llamada a la API
        console.log(`Intentando obtener UserDTO para idUser: ${userId}`);
        const userResponse = await getUserById(userId);
        const user: UserDTO = userResponse?.UserDTO; // Optional chaining para seguridad

        console.log(`Intentando obtener PlayerDTO para idUser: ${userId}`);
        const player: PlayerDTO = await getPlayerById(userId);

        // Debugging logs de los datos obtenidos
        console.log("Datos de Usuario obtenidos:", user);
        console.log("Datos de Jugador obtenidos:", player);

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
          // Si alguno de los DTOs es null o undefined, se muestra este error.
          // Es crucial verificar la respuesta de la API en la pestaña 'Network'.
          setError("No se encontraron todos los detalles para este jugador.");
        }
      } catch (e: any) {
        // Captura cualquier error de red o de la API
        console.error("Error al cargar los detalles del jugador:", e);
        setError(
          `Error al cargar los detalles del jugador: ${
            e.message || "Error desconocido"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerFullDetails();
  }, [userId]);

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

  // Renderiza la información del jugador
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header
        className="relative h-64 bg-center bg-cover rounded-xl shadow-lg"
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
        </div>
      </section>
    </div>
  );
};

export default PlayerDetail;
