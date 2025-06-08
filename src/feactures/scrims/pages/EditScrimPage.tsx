import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ IMPORTANTE

const EditScrimPage: React.FC = () => {
  const navigate = useNavigate(); // ✅ Hook de navegación

  const [scrim, setScrim] = useState({
    title: 'Clash de Junglas',
    date: '2025-06-15',
    time: '19:00',
    description: 'Práctica intensa entre equipos para controlar la jungla.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setScrim({ ...scrim, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Scrim actualizado:', scrim);

    // Aquí iría la llamada real a la API (PUT)

    // ✅ Redireccionar después de guardar
    navigate('/scrims/mine');
  };

  return (
    <div className="text-white px-8 py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Editar Scrim</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1">Título del Scrim</label>
          <input
            type="text"
            name="title"
            value={scrim.title}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded border border-gray-600 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Fecha</label>
            <input
              type="date"
              name="date"
              value={scrim.date}
              onChange={handleChange}
              className="w-full bg-gray-800 p-3 rounded border border-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Hora</label>
            <input
              type="time"
              name="time"
              value={scrim.time}
              onChange={handleChange}
              className="w-full bg-gray-800 p-3 rounded border border-gray-600 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Descripción</label>
          <textarea
            name="description"
            value={scrim.description}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded border border-gray-600 text-white"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded text-white font-semibold"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditScrimPage;

