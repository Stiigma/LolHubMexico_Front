import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useProfileModal } from "./ProfileModalContext";
import { getPlayerById } from "@/feactures/user/services/userService";
import type { PlayerDTO } from "@/feactures/user/types/PlayerDTO";

const ProfileModal: React.FC = () => {
  const { user } = useUser();
  const { isOpen, closeModal } = useProfileModal();
  const [player, setPlayer] = useState<PlayerDTO | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      if (!user?.idUser) return;
      try {
        const data = await getPlayerById(user.idUser);
        setPlayer(data);
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    };

    if (isOpen) {
      fetchPlayer();
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Perfil del Usuario</h2>
          <button onClick={closeModal} className="text-gray-600 hover:text-black">&times;</button>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={user?.profileImage || player?.profilePicture || "/assets/avatars/avatar1.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-4 object-cover border"
          />
          <p><strong>Nombre:</strong> {user?.fullName}</p>
          <p><strong>Usuario:</strong> {user?.userName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Teléfono:</strong> {user?.phoneNumber}</p>
          <p><strong>Nacionalidad:</strong> {user?.nacionality}</p>
          {player && (
            <>
              <hr className="w-full my-4" />
              <p><strong>Nombre Invocador:</strong> {player.summonerName}</p>
              <p><strong>Nivel:</strong> {player.level}</p>
              <p><strong>Rol Principal:</strong> {player.mainRole}</p>
            </>
          )}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;


