import { NavLink, Outlet } from "react-router-dom";

const ScrimsLayout = () => {
  const tabs = [
    { path: "/scrims/preview", label: "Preview" },
    { path: "/scrims/mine", label: "Mis Scrims" },
    { path: "/scrims/invitations", label: "Invitaciones" },
  ];

  return (
    <div>
      {/* Tabs internas de scrims */}
      <nav className="flex space-x-6 px-6 pt-8 border-b border-blue-800">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `pb-2 border-b-2 ${
                isActive ? "border-cyan-400 font-semibold" : "border-transparent hover:border-cyan-600"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* Contenido de cada pestaña */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ScrimsLayout;
