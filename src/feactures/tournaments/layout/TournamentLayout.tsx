import { NavLink, Outlet } from "react-router-dom";

const TournamentLayout = () => {
  return (
    <div className="px-6 py-4">
      <nav className="flex space-x-6 border-b border-gray-700 pb-2 mb-6">
        <NavLink
          to="/tournaments"
          className={({ isActive }) =>
            isActive
              ? "font-semibold border-b-2 border-white"
              : "text-gray-400 hover:text-white"
          }
        >
          Preview
        </NavLink>
        <NavLink
          to="/tournaments/my"
          className={({ isActive }) =>
            isActive
              ? "font-semibold border-b-2 border-white"
              : "text-gray-400 hover:text-white"
          }
        >
          Mis Torneos
        </NavLink>
        <NavLink
          to="/tournaments/invitations"
          className={({ isActive }) =>
            isActive
              ? "font-semibold border-b-2 border-white"
              : "text-gray-400 hover:text-white"
          }
        >
          Invitaciones
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default TournamentLayout;
