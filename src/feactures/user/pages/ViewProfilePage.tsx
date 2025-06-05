import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import StatisticsChart from '../components/StatisticsChart';

const ViewProfilePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Perfil lateral */}
      <aside className="col-span-1 bg-[#112a46] rounded-2xl p-6 flex flex-col items-center text-center shadow-lg">
        <img
          src={user?.profileImage || '/assets/avatars/avatar1.png'}
          alt="avatar"
          className="w-28 h-28 rounded-full border-4 border-white object-cover mb-4"
        />
        <h2 className="text-2xl font-bold">{user?.userName || 'Usuario'}</h2>
        <p className="text-sm text-gray-300">{user?.email || 'Correo no disponible'}</p>
        <span className="text-xs mt-2 bg-gray-700 px-3 py-1 rounded-full">
          Rol: {user?.role || 'N/D'}
        </span>

        <button
          onClick={() => navigate('/profile/edit')}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
        >
          Editar perfil
        </button>

        <div className="mt-8 w-full text-left space-y-2 text-sm">
          <p><strong>Nombre completo:</strong> {user?.fullName || 'N/D'}</p>
          <p><strong>Teléfono:</strong> {user?.phoneNumber || 'N/D'}</p>
          <p><strong>Nacionalidad:</strong> {user?.nacionality || 'N/D'}</p>
        </div>
      </aside>

      {/* Sección principal */}
      <main className="col-span-1 lg:col-span-3 space-y-8">
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
      </main>
    </div>
  );
};

export default ViewProfilePage;








