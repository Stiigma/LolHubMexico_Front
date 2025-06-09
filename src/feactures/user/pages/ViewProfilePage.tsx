import { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import StatisticsChart from '../components/StatisticsChart';
import { getUserById, getPlayerById } from '../services/userService';
import type { UserDTO } from '@/shared/types/User/UserDTO';
import type { PlayerDTO } from '../types/PlayerDTO';

const ViewProfilePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userComplete, setUserComplete] = useState<UserDTO | null>(null);
  const [userPlayer, setUserPlayer] = useState<PlayerDTO | null>(null);

  useEffect(() => {
    const fetchUserComplete = async () => {
      if (!user?.idUser) return;

      try {
        const response = await getUserById(user.idUser);
        setUserComplete(response);

        try {
          const player = await getPlayerById(user.idUser);
          setUserPlayer(player);
        } catch (playerError) {
          console.warn("Este usuario no tiene perfil de jugador (no vinculado aún).");
          setUserPlayer(null);
        }

      } catch (error) {
        console.error("Error al obtener perfil del usuario:", error);
      }
    };

    fetchUserComplete();
  }, [user]);

  if (!userComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-[#0B1120] text-white p-4 rounded shadow-lg">
          Cargando información del perfil...
        </div>
      </div>
    );
  }

  const isLinked = userComplete.role === 3;

  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Perfil lateral */}
      <aside className="col-span-1 bg-[#112a46] rounded-2xl p-6 flex flex-col items-center text-center shadow-lg">
        <img
          src={userPlayer?.profilePicture || '/assets/avatars/avatar1.png'}
          alt="avatar"
          className="w-28 h-28 rounded-full border-4 border-white object-cover mb-4"
        />
        <h2 className="text-2xl font-bold">{userComplete.userName || 'Usuario'}</h2>
        <p className="text-sm text-gray-300">{userComplete.email || 'Correo no disponible'}</p>

        <span
          className={`text-xs mt-2 px-3 py-1 rounded-full font-medium ${
            isLinked ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {isLinked ? "Usuario" : "No vinculado"}
        </span>

        <button
          onClick={() => navigate('/profile/edit')}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
        >
          Editar perfil
        </button>

        <div className="mt-8 w-full text-left space-y-2 text-sm">
          <p><strong>Nombre completo:</strong> {userComplete.fullName || 'N/D'}</p>
          <p><strong>Teléfono:</strong> {userComplete.phoneNumber || 'N/D'}</p>
          <p><strong>Nacionalidad:</strong> {userComplete.nacionality || 'N/D'}</p>
          <p><strong>Fecha de registro:</strong> {new Date(userComplete.fechaRegistro).toLocaleDateString()}</p>
        </div>
      </aside>

      {/* Sección principal */}
      <main className="col-span-1 lg:col-span-3 space-y-8">
        {isLinked ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#1e293b] rounded-xl p-4 shadow">
                <h4 className="font-semibold text-lg mb-2">Últimos Torneos</h4>
                <ul className="text-sm text-gray-300 list-disc list-inside">
                  <li>ARAM Fiesta - 2025-06-30</li>
                  <li>Hextech Cup - 2025-07-05</li>
                </ul>
              </div>

              <div className="bg-[#1e293b] rounded-xl p-4 shadow">
                <h4 className="font-semibold text-lg mb-2">Scrims Recientes</h4>
                <ul className="text-sm text-gray-300 list-disc list-inside">
                  <li>Jungle Clash - 2025-06-15</li>
                  <li>Bot Lane Duel - 2025-06-18</li>
                </ul>
              </div>

              <div className="bg-[#1e293b] rounded-xl p-4 shadow">
                <h4 className="font-semibold text-lg mb-2">Estadísticas</h4>
                <table className="w-full text-sm text-left text-gray-300">
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-1">Torneos jugados:</td>
                      <td className="py-1 text-right">5</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-1">Scrims jugados:</td>
                      <td className="py-1 text-right">12</td>
                    </tr>
                    <tr>
                      <td className="py-1">Victorias:</td>
                      <td className="py-1 text-right">8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gráfica */}
            <StatisticsChart />
          </>
        ) : (
          <div className="bg-[#1e293b] p-6 rounded-xl text-center text-gray-300">
            <h3 className="text-lg font-semibold mb-2">Tu cuenta aún no está vinculada</h3>
            <p>Vincula tu cuenta de Riot para ver tus estadísticas de scrims y torneos.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewProfilePage;








