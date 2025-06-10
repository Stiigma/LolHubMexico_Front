import React from "react";
import CreateTournamentForm from "./CreateTournamentForm";

interface Props {
  onClose: () => void;
}

const CreateTournamentModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#112a46] w-full max-w-md p-8 rounded-2xl shadow-lg relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg hover:text-red-400"
        >
          ✕
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Crear nuevo Torneo
        </h2>

        {/* Formulario de creación*/}
        <CreateTournamentForm onSuccess={onClose} /> 
      </div>
    </div>
  );
};

export default CreateTournamentModal;
