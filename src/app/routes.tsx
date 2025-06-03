import { Routes, Route } from 'react-router-dom';

// Páginas principales
import HomePage from '../feactures/home/pages/HomePage';
import LoginPage from '../feactures/auth/pages/LoginPage';
import RegisterPage from '../feactures/auth/pages/RegisterPage';
import DashboardPage from '../feactures/dashboard/pages/DashboardPage';

// Equipos
import TeamsLayout from '../feactures/teams/layout/TeamsLayout';
import PreviewPage from '../feactures/teams/pages/PreviewPage';
import BrowserPage from '../feactures/teams/pages/BrowserPage';
import MyTeamPage from '../feactures/teams/pages/MyTeamPage';
import InvitationTeamPage from '../feactures/teams/pages/InvitationTeamPage';

// Perfil
import EditProfilePage from '../feactures/user/pages/EditProfilePage.tsx';

// Torneos
import TournamentsPage from '../feactures/tournaments/pages/TournamentsPage';
import CreateTournamentPage from '../feactures/tournaments/pages/CreateTournamentPage';
import TournamentDetailPage from '../feactures/tournaments/pages/TournamentDetailPage';
import EditTournamentPage from '../feactures/tournaments/pages/EditTournamentPage.tsx';

// Protección de rutas privadas
import PrivateRoute from '../core/PrivateRoute.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      {/* Perfil */}
      <Route
        path="/profile/edit"
        element={
          <PrivateRoute>
            <EditProfilePage />
          </PrivateRoute>
        }
      />

      {/* Equipos */}
      <Route path="/teams" element={<TeamsLayout />}>
        <Route path="preview" element={<PreviewPage />} />
        <Route path="browser" element={<BrowserPage />} />
        <Route path="my-team" element={<MyTeamPage />} />
        <Route path="invitation-team" element={<InvitationTeamPage />} />
      </Route>

      {/* Torneos */}
      <Route
        path="/tournaments"
        element={
          <PrivateRoute>
            <TournamentsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/tournaments/create"
        element={
          <PrivateRoute>
            <CreateTournamentPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/tournaments/:id"
        element={
          <PrivateRoute>
            <TournamentDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/tournaments/:id/edit"
        element={
          <PrivateRoute>
            <EditTournamentPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;


