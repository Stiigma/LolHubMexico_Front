import LinkSummonerForm from '@/feactures/auth/components/LinkSummonerForm';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

import {
  FaSearch,
  FaUsers,
  FaGamepad,
  FaChartBar,
  FaEye,
  FaNewspaper,
  FaCloud,
  FaHandshake, // nuevo ícono para Scrims
} from "react-icons/fa";
import { Link } from "react-router-dom";

const logo = "/assets/logo.png";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();
  console.log(user)
  if (!user) {
  return (
    <div className="w-64 bg-[#0d1b2a] text-white px-6 py-8 flex items-center justify-center min-h-screen">
      <span className="text-sm text-gray-400">Cargando...</span>
    </div>
  );
  }


  const userId = user.idUser;

  return (
    <div className="w-64 bg-[#0d1b2a] text-white px-6 py-8 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 text-xl font-bold mb-10">
        <Link to="/dashboard" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <span className="tracking-wide">LHM</span>
        </Link>
      </div>

      {/* Menú */}
      <nav className="flex flex-col gap-4 text-[15px] font-medium">
        <Link to="/search" className="flex items-center gap-3">
          <FaSearch className="text-sky-300" /> Buscar
        </Link>

        <Link to="/teams/preview" className="flex items-center gap-3">
          <FaUsers className="text-purple-300" /> Buscar Equipo
        </Link>

        <Link to="/play" className="flex items-center gap-3">
          <FaGamepad className="text-indigo-300" /> Jugar
        </Link>

        <Link to="/ranking" className="flex items-center gap-3">
          <FaChartBar className="text-pink-300" /> Ranking
        </Link>

        <Link to="/stats" className="flex items-center gap-3">
          <FaEye className="text-lime-300" /> Estadísticas
        </Link>

        <Link to="/feed" className="flex items-center gap-3">
          <FaNewspaper className="text-gray-300" /> Feed
        </Link>

        <hr className="my-4 border-blue-800" />

        {/* NUEVA OPCIÓN: SCRIMS */}
        <Link to="/scrims/preview" className="flex items-center gap-3">
          <FaHandshake className="text-teal-300" /> Scrims
        </Link>

        <Link to="/tournaments" className="flex items-center gap-3">
          <FaCloud className="text-amber-300" /> Torneos
        </Link>

        {user?.role === 2 && (
          <div className="px-4 py-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition w-full"
            >
              🔗 Vincular Invocador
            </button>
          </div>
        )}


      </nav>

       {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#0d1b2a] rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
            >
              ✖
            </button>
            <LinkSummonerForm userId={userId} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
