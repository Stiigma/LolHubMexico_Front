import React from "react";
import { useUser } from "../../../context/UserContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { user } = useUser();
  console.log(user?.userName);

  return (
    <header className="bg-[#0d1b2a] text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Botón izquierda */}
        <div className="flex-1">
          <button className="bg-[#10b981] hover:bg-[#34d399] text-white text-sm px-4 py-2 rounded transition font-semibold">
            Conectar cuenta Riot
          </button>
        </div>

        {/* Navegación centrada */}
        <nav className="flex-1 flex justify-center space-x-10 text-sm font-semibold">
          <NavLink
            to="/teams/preview"
            className={({ isActive }) =>
              isActive
                ? "text-[#10b981] border-b-2 border-[#10b981] pb-1"
                : "text-white hover:text-[#10b981] transition"
            }
          >
            Preview
          </NavLink>
          <NavLink
            to="/teams/browser"
            className={({ isActive }) =>
              isActive
                ? "text-[#10b981] border-b-2 border-[#10b981] pb-1"
                : "text-white hover:text-[#10b981] transition"
            }
          >
            Teams
          </NavLink>
          <NavLink
            to="/teams/my-team"
            className={({ isActive }) =>
              isActive
                ? "text-[#10b981] border-b-2 border-[#10b981] pb-1"
                : "text-white hover:text-[#10b981] transition"
            }
          >
            My Team
          </NavLink>
          <NavLink
            to="/teams/invitation-team"
            className={({ isActive }) =>
              isActive
                ? "text-[#10b981] border-b-2 border-[#10b981] pb-1"
                : "text-white hover:text-[#10b981] transition"
            }
          >
            Invitation Team
          </NavLink>
        </nav>

        {/* Espacio vacío para alinear centro */}
        <div className="flex-1 flex justify-end items-center space-x-4"></div>
      </div>
    </header>
  );
};

export default Header;
