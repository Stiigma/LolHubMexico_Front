import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../../../shared/components/Sidebar";

const TeamsLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#011324ee]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="py-1 text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeamsLayout;
