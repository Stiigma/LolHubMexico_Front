import { useState } from "react";
import Sidebar from "../components/Sidebar";
import UserActionsPanel from "../feactures/dashboard/components/UserActionsPanel";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

// 👇 Importa el modal y el contexto
import ProfileModal from "@/feactures/user/components/ProfileModal";
import { useProfileModal } from "@/feactures/dashboard/components/ProfileModalContext";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isOpen, closeModal } = useProfileModal(); // ✅ hook del contexto

  return (
    <div className="flex min-h-screen bg-[#0B1120] text-white relative">
      {/* Botón universal */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 bg-[#111827] p-2 rounded-full"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 h-full bg-[#0d1b2a] w-64 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block`}
      >
        <Sidebar />
      </div>

      {/* Contenido principal */}
      <div
        className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <Outlet />
      </div>

      {/* Panel flotante de usuario */}
      <div className="fixed top-4 right-4 z-50">
        <UserActionsPanel />
      </div>

      {/* ✅ Modal de perfil (controlado por contexto) */}
      {isOpen && <ProfileModal onClose={closeModal} />}
    </div>
  );
};

export default MainLayout;







