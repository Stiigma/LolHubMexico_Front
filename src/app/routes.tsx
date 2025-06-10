import { Routes, Route, Navigate } from "react-router-dom";

// Páginas públicas
import HomePage from "../feactures/home/pages/HomePage";
import LoginPage from "../feactures/auth/pages/LoginPage";
import RegisterPage from "../feactures/auth/pages/RegisterPage";

// Dashboard y perfil
import DashboardPage from "../feactures/dashboard/pages/DashboardPage";
import EditProfilePage from "../feactures/user/pages/EditProfilePage";
import ViewProfilePage from "../feactures/user/pages/ViewProfilePage";

// Equipos
import TeamsLayout from "../feactures/teams/layout/TeamsLayout";
import PreviewPage from "../feactures/teams/pages/PreviewPage";
import BrowserPage from "../feactures/teams/pages/BrowserPage";
import MyTeamPage from "../feactures/teams/pages/MyTeamPage";
import InvitationTeamPage from "../feactures/teams/pages/InvitationTeamPage";
import TeamDetail from "../feactures/teams/pages/TeamDetail";
import PlayerDetail from "../feactures/teams/pages/PlayerDetail";

// Torneos
import TournamentLayout from "../feactures/tournaments/layout/TournamentLayout";
import TournamentsPreviewPage from "../feactures/tournaments/pages/TournamentsPreviewPage";
import MyTournamentsPage from "../feactures/tournaments/pages/MyTournamentsPage";
import InvitationsPageTournaments from "../feactures/tournaments/pages/InvitationsPage";
import CreateTournamentPage from "../feactures/tournaments/pages/CreateTournamentPage";
import TournamentDetailPage from "../feactures/tournaments/pages/TournamentDetailPage";
import EditTournamentPage from "../feactures/tournaments/pages/EditTournamentPage";
import TournamentBracketPage from "../feactures/tournaments/pages/TournamentBracketPage"; // ✅ NUEVA RUTA

// Scrims
import ScrimsLayout from "../feactures/scrims/layout/ScrimsLayout";
import ScrimsPreviewPage from "../feactures/scrims/pages/ScrimsPreviewPage";
import MyScrimsPage from "../feactures/scrims/pages/MyScrimsPage";
import InvitationsPageScrims from "../feactures/scrims/pages/InvitationsPage";
import ScrimDetailPage from "../feactures/scrims/pages/ScrimDetailPage";
import CompletedScrimDetailPage from "../feactures/scrims/pages/CompletedScrimDetailPage";
import EditScrimPage from "../feactures/scrims/pages/EditScrimPage";

// Layout general
import MainLayout from "../layouts/MainLayout";

// Protección de rutas privadas
import PrivateRoute from "../core/PrivateRoute";

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

      {/* Perfil bajo MainLayout */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<ViewProfilePage />} />
        <Route path="edit" element={<EditProfilePage />} />
      </Route>

      {/* Equipos bajo MainLayout */}
      <Route
        path="/teams"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route element={<TeamsLayout />}>
          <Route path="preview" element={<PreviewPage />} />
          <Route path="browser" element={<BrowserPage />} />
          <Route path="my-team" element={<MyTeamPage />} />
          <Route path="invitation-team" element={<InvitationTeamPage />} />
          <Route path=":id" element={<TeamDetail />} />
          <Route path=":id" element={<PlayerDetail />} />
        </Route>
      </Route>

      {/* Torneos bajo MainLayout */}
      <Route
        path="/tournaments"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route element={<TournamentLayout />}>
          <Route index element={<Navigate to="preview" replace />} />
          <Route path="preview" element={<TournamentsPreviewPage />} />
          <Route path="my" element={<MyTournamentsPage />} />
          <Route path="invitations" element={<InvitationsPageTournaments />} />
        </Route>
        <Route path="create" element={<CreateTournamentPage />} />
        <Route path=":id" element={<TournamentDetailPage />} />
        <Route path=":id/edit" element={<EditTournamentPage />} />
        <Route path=":id/bracket" element={<TournamentBracketPage />} />{" "}
        {/* ✅ NUEVA RUTA */}
      </Route>

      {/* Scrims bajo MainLayout */}
      <Route
        path="/scrims"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route element={<ScrimsLayout />}>
          <Route path="preview" element={<ScrimsPreviewPage />} />
          <Route path="mine" element={<MyScrimsPage />} />
          <Route path="invitations" element={<InvitationsPageScrims />} />
        </Route>
        <Route path="history/:id" element={<CompletedScrimDetailPage />} />
        <Route path=":id/edit" element={<EditScrimPage />} />
        <Route path=":id" element={<ScrimDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
