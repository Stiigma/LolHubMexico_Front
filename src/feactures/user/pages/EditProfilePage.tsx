import React, { useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import AvatarModal from '../components/AvatarModal';

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

  const [username, setUsername] = useState(user?.userName || '');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [nacionality, setNacionality] = useState(user?.nacionality || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || avatarOptions[0]);
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
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Editar Perfil</h1>

      <div className="bg-blue-950 p-6 rounded-xl w-full max-w-md shadow-xl flex flex-col items-center space-y-4 relative">
        {/* Avatar con botón "+" */}
        <div className="relative">
          <img
            src={profileImage}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full border-2 border-white object-cover"
          />
          <button
            onClick={() => setShowModal(true)}
            className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 p-1 rounded-full text-sm"
          >
            <FaPlus />
          </button>
        </div>

        {/* Campos de edición */}
        <label className="w-full text-left text-sm mt-4">Nombre de usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        />

        <label className="w-full text-left text-sm">Nombre completo</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        />

        <label className="w-full text-left text-sm">Número de teléfono</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        />

        <label className="w-full text-left text-sm">Nacionalidad</label>
        <input
          type="text"
          value={nacionality}
          onChange={(e) => setNacionality(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
        />

        <button
          onClick={handleSave}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition p-2 rounded text-white font-semibold"
        >
          Guardar Cambios
        </button>
      </div>

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
  );
};

export default EditProfilePage;
