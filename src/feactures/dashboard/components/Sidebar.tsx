import {
  FaSearch,
  FaUsers,
  FaGamepad,
  FaChartBar,
  FaEye,
  FaNewspaper,
  FaPlus,
  FaCloud,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const logo = "/assets/logo.png"; // Ya que está en public/images/

const Sidebar = () => {
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

        <Link to="/tournaments" className="flex items-center gap-3">
          <FaCloud className="text-amber-300" /> Torneos
        </Link>

        <Link to="/tournaments/create" className="flex items-center gap-3">
          <FaPlus className="text-purple-400" /> Crear Torneo
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;



