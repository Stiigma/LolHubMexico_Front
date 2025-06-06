import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '@/context/UserContext'; // ajusta la ruta según tu proyecto

interface Props {
  userId: number;
  onClose: () => void;
}

export default function LinkSummonerForm({ userId, onClose }: Props) {
  const [summonerName, setSummonerName] = useState('');
  const [mainRole, setMainRole] = useState('TOP');
  const [error, setError] = useState('');
  const { user, setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5022/api/Player/link', {
        userId,
        summonerName,
        mainRole,
      });

      if (response.status === 200) {
        toast.success('Invocador vinculado correctamente ✅');

        if (user) {
          const updatedUser = { ...user, role: 3 };
          console.log(updatedUser);
          setUser(updatedUser);
        }

        onClose(); // ✅ cerrar modal
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al vincular invocador');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#0d1b2a] p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Vincular Invocador</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-white block mb-1">Nombre del Invocador</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            value={summonerName}
            onChange={(e) => setSummonerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-white block mb-1">Rol Principal</label>
          <select
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
            value={mainRole}
            onChange={(e) => setMainRole(e.target.value)}
          >
            <option value="TOP">ARRIBA</option>
            <option value="JUNGLE">JUNGLA</option>
            <option value="MID">MEDIO</option>
            <option value="ADC">ADC</option>
            <option value="SUPPORT">SOPORTE</option>
          </select>
        </div>

        {error && (
          <div className="text-red-500 font-medium text-sm bg-red-950 p-2 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Vincular
        </button>
      </form>
    </div>
  );
}
