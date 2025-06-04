import Sidebar from "../components/Sidebar";
import UserActionsPanel from "../feactures/dashboard/components/UserActionsPanel";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#0B1120] text-white relative">
      {/* Sidebar de navegación */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>

      {/* Panel flotante de usuario */}
      <div className="fixed top-4 right-4 z-50">
        <UserActionsPanel />
      </div>
    </div>
  );
};

export default MainLayout;


