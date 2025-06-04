import React, { useState } from "react";
import CreateScrimModal from "../components/CreateScrimModal";

const ScrimsPreviewPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="px-6 py-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Domina la Grieta con Scrims</h1>
          <p className="text-sm text-gray-300">
            Entrena con otros equipos, afina estrategias y mejora tu coordinación.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
        >
          Crear Scrim
        </button>
      </div>

      {/* ... Lista de scrims aquí ... */}

      {showModal && <CreateScrimModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ScrimsPreviewPage;

