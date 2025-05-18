import React from "react";
import { FiSearch, FiUsers, FiPlay, FiTrendingUp, FiEye, FiGrid, FiPlus } from "react-icons/fi";
import { IoCloudOutline, IoCartOutline, IoRocketOutline } from "react-icons/io5";
import logo from '../../assets/logo.png';

const Sidebar = () => {
  return (
    <aside className="bg-[#18324df8] text-white w-64 min-h-screen p-4 flex flex-col justify-between">
      {/* Menú principal */}
      <div className="space-y-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-6">
          <img src={logo} alt="Logo" className="h-17 w-17" />
          <span className="font-bold text-lg ">LHM</span>
        </div>

        <nav className="space-y-2">
          <MenuItem icon={<FiSearch />} text="Buscar" />
          <MenuItem icon={<FiUsers />} text="Buscar Equipo" />
          <MenuItem icon={<FiPlay />} text="Jugar" />
          <MenuItem icon={<FiTrendingUp />} text="Ranking" />
          <MenuItem icon={<FiEye />} text="Estadísticas" />
          <MenuItem icon={<FiGrid />} text="Feed" />
          <MenuItem icon={<IoCloudOutline />} text="Clubes" />
          <MenuItem icon={<FiPlus />} text="Crear Club" />
        </nav>
      </div>

      {/* Sección inferior */}
      <div className="space-y-2">
        <MenuItem icon={<IoRocketOutline />} text="Misiones" />
        <MenuItem icon={<IoCartOutline />} text="Tienda" />
        <button className="w-full mt-2 bg-green-600 hover:bg-green-500 text-white text-sm py-2 rounded font-semibold">
          Mejorar cuenta
        </button>
      </div>
    </aside>
  );
};

// Subcomponente para cada ítem
const MenuItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <button className="flex items-center space-x-3 px-2 py-2 w-full hover:bg-blue-800 rounded transition">
    <span className="text-lg">{icon}</span>
    <span className="text-sm">{text}</span>
  </button>
);

export default Sidebar;
