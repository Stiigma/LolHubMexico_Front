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
import TournamentBracketPage from "../feactures/tournaments/pages/TournamentBracketPage";

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

// Contexto de perfil
import { ProfileModalProvider } from "../feactures/dashboard/components/ProfileModalContext";

// Protección de rutas privadas
import PrivateRoute from "../core/PrivateRoute";

const AppRoutes = () => {
  return (
    <ProfileModalProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/*
          Rutas que usan MainLayout (incluyendo el Dashboard, perfil, equipos, torneos, scrims)
          Ahora el Dashboard estará envuelto por MainLayout, lo que permitirá que el Sidebar
          y UserActionsPanel se muestren si MainLayout los renderiza.
        */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} /> {/* <-- MOVIDO AQUÍ */}

          {/* Rutas de Perfil */}
          <Route path="/profile" element={<ViewProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />

          {/* Rutas de Equipos */}
          <Route path="/teams" element={<TeamsLayout />}>
            <Route index element={<Navigate to="preview" replace />} />
            <Route path="preview" element={<PreviewPage />} />
            <Route path="browser" element={<BrowserPage />} />
            <Route path="my-team" element={<MyTeamPage />} />
            <Route path="invitation-team" element={<InvitationTeamPage />} />
            <Route path=":id" element={<TeamDetail />} />
          </Route>

          {/* RUTA PARA EL DETALLE DEL JUGADOR - FUERA DEL TeamsLayout anidado con :id */}
          {/* Se define en el mismo nivel que /teams para evitar conflictos de :id */}
          {/* La URL será /player/:id (ej. /player/7) */}
          <Route path="/player/:id" element={<PlayerDetail />} />

          {/* Rutas de Torneos */}
          <Route path="/tournaments" element={<TournamentLayout />}>
            <Route index element={<Navigate to="preview" replace />} />
            <Route path="preview" element={<TournamentsPreviewPage />} />
            <Route path="my" element={<MyTournamentsPage />} />
            <Route
              path="invitations"
              element={<InvitationsPageTournaments />}
            />
          </Route>
          {/* Rutas detalladas de torneo, fuera del TournamentLayout anidado con path específico */}
          <Route
            path="/tournaments/create"
            element={<CreateTournamentPage />}
          />
          <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
          <Route
            path="/tournaments/:id/edit"
            element={<EditTournamentPage />}
          />
          <Route
            path="/tournaments/:id/bracket"
            element={<TournamentBracketPage />}
          />

          {/* Rutas de Scrims */}
          <Route path="/scrims" element={<ScrimsLayout />}>
            <Route index element={<Navigate to="preview" replace />} />
            <Route path="preview" element={<ScrimsPreviewPage />} />
            <Route path="mine" element={<MyScrimsPage />} />
            <Route path="invitations" element={<InvitationsPageScrims />} />
          </Route>
          {/* Rutas detalladas de scrims, fuera del ScrimsLayout anidado con path específico */}
          <Route
            path="/scrims/history/:id"
            element={<CompletedScrimDetailPage />}
          />
          <Route path="/scrims/:id/edit" element={<EditScrimPage />} />
          <Route path="/scrims/:id" element={<ScrimDetailPage />} />
        </Route> {/* Cierre del MainLayout */}

        {/* Ruta catch-all para 404 (opcional) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProfileModalProvider>
  );
};

export default AppRoutes;