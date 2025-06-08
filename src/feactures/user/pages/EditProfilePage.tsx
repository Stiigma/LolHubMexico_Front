import React, { useEffect, useState } from "react";
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import AvatarModal from '../components/AvatarModal';
import { getPlayerById } from "../services/userService";
import type { PlayerDTO } from "../types/PlayerDTO";

const avatarOptions = [
  '/assets/avatars/avatar1.png',
  '/assets/avatars/avatar2.png',
  '/assets/avatars/avatar3.png',
  '/assets/avatars/avatar4.png',
  '/assets/avatars/avatar5.png',
];

const EditProfilePage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<PlayerDTO | null>(null);
  useEffect(() => {
  const fetchPlayer = async () => {
    if (!user?.idUser) return;
    const result = await getPlayerById(user.idUser);
    setPlayer(result); // Aquí asumes que tienes un setPlayer
  };

  fetchPlayer();
}, [user]);
  const [username, setUsername] = useState(user?.userName || '');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [nacionality, setNacionality] = useState(user?.nacionality || '');
  const [profileImage, setProfileImage] = useState(player?.profilePicture || avatarOptions[0]);
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    const updated = {
      username,
      fullName,
      phoneNumber,
      nacionality,
      profileImage,
    };

    console.log('Datos actualizados:', updated);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white flex justify-center items-center px-6 py-12">
      <div className="bg-[#0F172A] rounded-2xl p-10 shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-10">Editar Perfil</h1>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Avatar */}
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
          </div>

          {/* Formulario */}
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

        <button
          onClick={handleSave}
          className="w-full mt-10 bg-green-600 hover:bg-green-700 transition p-3 rounded-lg text-white font-bold shadow-md"
        >
          Guardar Cambios
        </button>

        {/* Modal de selección de avatar */}
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


