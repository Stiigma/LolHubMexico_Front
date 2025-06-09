import React, { useEffect, useState } from "react";
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import AvatarModal from '../components/AvatarModal';
import { getUserById, getPlayerById, updateUserProfile } from "../services/userService";
import type { PlayerDTO } from "../types/PlayerDTO";
import type { UserDTO } from "@/shared/types/User/UserDTO";
import { toast } from "react-toastify";

const avatarOptions = [
  '/assets/avatars/avatar1.png',
  '/assets/avatars/avatar2.png',
  '/assets/avatars/avatar3.png',
  '/assets/avatars/avatar4.png',
  '/assets/avatars/avatar5.png',
];

const EditProfilePage: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<PlayerDTO | null>(null);
  const [userData, setUserData] = useState<UserDTO | null>(null);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nacionality, setNacionality] = useState('');
  const [profileImage, setProfileImage] = useState(avatarOptions[0]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.idUser) return;

      try {
        const fullUser = await getUserById(user.idUser);
        const playerInfo = await getPlayerById(user.idUser);

        setUserData(fullUser);
        setPlayer(playerInfo);

        setUsername(fullUser.userName || '');
        setFullName(fullUser.fullName || '');
        setPhoneNumber(fullUser.phoneNumber || '');
        setNacionality(fullUser.nacionality || '');
        setProfileImage(playerInfo?.profilePicture || avatarOptions[0]);
      } catch (err) {
        console.error("Error al cargar los datos del perfil:", err);
      }
    };

    fetchData();
  }, [user]);

  const handleSave = async () => {
    setError('');
    if (!username || !fullName || !phoneNumber || !nacionality) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!userData) return;

    const updated: UserDTO = {
      ...userData,
      userName: username,
      fullName,
      phoneNumber,
      nacionality,
      // No modificamos email, role, token, fechaRegistro porque los mantiene userData
    };

    try {
      await updateUserProfile(updated);
      toast.success("Perfil actualizado correctamente ✅");
      setUser(updated);
      navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al actualizar perfil");
    }
  };

  if (!userData) {
    return <div className="text-white text-center mt-10">Cargando datos del perfil...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white flex justify-center items-center px-6 py-12">
      <div className="bg-[#0F172A] rounded-2xl p-10 shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-10">Editar Perfil</h1>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="relative w-36 h-36">
            <img
              src={profileImage}
              alt="Foto de perfil"
              className="w-full h-full rounded-full border-4 border-white object-cover"
            />
            <button
              onClick={() => setShowModal(true)}
              className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-sm shadow-lg"
            >
              <FaEdit />
            </button>
            <p className="text-center text-sm mt-2">
              Cuenta de Riot: {player?.role === 3 ? (
                <span className="text-green-400 font-medium">Vinculada</span>
              ) : (
                <span className="text-yellow-400 font-medium">No vinculada</span>
              )}
            </p>
          </div>

          <div className="flex-1 grid md:grid-cols-2 gap-8 w-full">
            <div>
              <label className="block text-sm font-semibold mb-1">Nombre de usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Nombre completo</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Número de teléfono</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Nacionalidad</label>
              <input
                type="text"
                value={nacionality}
                onChange={(e) => setNacionality(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 bg-red-900 p-2 mt-4 rounded text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleSave}
          className="w-full mt-10 bg-green-600 hover:bg-green-700 transition p-3 rounded-lg text-white font-bold shadow-md"
        >
          Guardar Cambios
        </button>

        {showModal && (
          <AvatarModal
            avatars={avatarOptions}
            onSelect={(url) => {
              setProfileImage(url);
              setShowModal(false);
            }}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;


