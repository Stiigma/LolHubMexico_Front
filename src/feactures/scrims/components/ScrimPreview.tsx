import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import type { ScrimEnriched } from "../types/ScrimEnriched";
import type { IScrimPreview } from "../types/ScrimPreview";
import UserInfoCard from "./UserInfoCard";
import type { LinkUser } from "@/feactures/user/types/LinkUser";
import { getScrimPlayers } from "../services/ScrimService";
import type { RivalDTO } from "../types/RivalDTO";
import { acceptScrim, isMyScrim } from "../services/ScrimService";
import { getMyTeam } from "@/feactures/teams/services/teamService";

const ScrimPreview: React.FC<IScrimPreview> = ({ scrimEnriched, isOpen, onClose }) => {
  const [players, setPlayers] = useState<LinkUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [canJoin, setCanJoin] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useUser().user;
  useEffect(() => {
    const initializePreview = async () => {
        if (!isOpen || !user) return;

        setLoading(true);
        try {
        // Obtener jugadores del equipo 1
        const result = await getScrimPlayers(
            scrimEnriched.scrimPDTO.idScrim,
            scrimEnriched.scrimPDTO.idTeam1
        );
        setPlayers(result);

        const myteam = await getMyTeam(user.idUser);

        // Verificar si el usuario ya está en la scrim
        const isUserInScrim = await isMyScrim(
            scrimEnriched.scrimPDTO.idScrim,
            myteam.idTeam,
        );
        setCanJoin(!isUserInScrim); // true solo si NO pertenece a ningún equipo de la scrim
        } catch (error) {
        console.error("Error en la carga de la scrim:", error);
        } finally {
        setLoading(false);
        }
    };

    initializePreview();
    }, [isOpen, user, scrimEnriched.scrimPDTO.idScrim, scrimEnriched.scrimPDTO.idTeam1]);

  if (!isOpen) return null;

  const fechaFormateada = new Date(scrimEnriched.scrimPDTO.scheduled_date).toLocaleString("es-MX");

  const handleJoinScrim = async () => {
    if (!user) {
        alert("Debes iniciar sesión para unirte a una scrim.");
        return;
        }
    const dto: RivalDTO = {
        idScrim: scrimEnriched.scrimPDTO.idScrim,
        idRival: user?.idUser, // Ajusta según cómo obtienes el equipo del usuario
        isAccept: true,
        idsUsers: [user.idUser], 
    };

    const success = await acceptScrim(dto);
    if (success) {
        navigate(`/scrims/mine`);
    } else {
        alert("Hubo un error al aceptar la scrim");
    }
    };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white text-black rounded-xl shadow-lg w-full max-w-xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            Scrim: {scrimEnriched.scrimPDTO?.tittle || "Sin título"}
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Fecha programada: <strong>{fechaFormateada}</strong>
          </p>

          <div className="flex flex-col items-center gap-2 mt-6">
            <img
              src={scrimEnriched.logoTeam1 || "/default-team-logo.png"}
              alt="Logo equipo"
              className="w-20 h-20 rounded-full border object-cover"
            />
            <p className="text-lg font-semibold">{scrimEnriched.teamName1}</p>
            <p className="text-sm text-gray-600">Capitán: {scrimEnriched.createdby}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-md font-semibold mb-2">Jugadores:</h3>
          <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">
            {loading ? (
              <p className="text-sm text-gray-500">Cargando jugadores...</p>
            ) : players.length === 0 ? (
              <p className="text-sm text-gray-500">Sin jugadores disponibles.</p>
            ) : (
              players.map((player) => (
                <UserInfoCard key={player.user.userName} user={player} />
              ))
            )}
          </div>
        </div>

        {/* BOTÓN ENTRAR A SCRIM */}
        {canJoin && (
            <div className="mt-6 text-center">
                <button
                onClick={handleJoinScrim}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition"
                >
                Entrar a Scrim
                </button>
            </div>
            )}
      </div>
    </div>
  );
};

export default ScrimPreview;
