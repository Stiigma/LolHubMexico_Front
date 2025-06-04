import React from "react";

interface Props {
  onClose: () => void;
}

const CreateScrimModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#112a46] w-full max-w-md p-8 rounded-2xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Crear nuevo Scrim
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Título del scrim
            </label>
            <input
              type="text"
              placeholder="Ej. Jungle Clash"
              className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Descripción
            </label>
            <textarea
              rows={3}
              placeholder="Breve descripción del scrim"
              className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-white mb-1">
                Fecha
              </label>
              <input
                type="date"
                className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-white mb-1">
                Hora
              </label>
              <input
                type="time"
                className="w-full bg-[#1e3a5f] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition"
          >
            Publicar Scrim
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateScrimModal;
