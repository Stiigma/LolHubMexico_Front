import { Routes, Route } from 'react-router-dom';
import HomePage from '../feactures/home/pages/HomePage';
import LoginPage from '../feactures/auth/pages/LoginPage';
import RegisterPage from '../feactures/auth/pages/RegisterPage';
import TeamsPage from '../feactures/teams/pages/TeamsPage';
import TeamsLayout from "../feactures/teams/layout/TeamsLayout";
import PreviewPage from "../feactures/teams/pages/PreviewPage";
import BrowserPage from "../feactures/teams/pages/BrowserPage";
import MyTeamPage from '../feactures/teams/pages/MyTeamPage';
import InvitationTeamPage from '../feactures/teams/pages/InvitationTeamPage';
// puedes agregar más rutas como LoginPage aquí

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teams" element={<TeamsLayout />}>
        <Route path="preview" element={<PreviewPage />} />
        <Route path="browser" element={<BrowserPage />} />
        <Route path="my-team" element={<MyTeamPage />} />
        <Route path="invitation-team" element={<InvitationTeamPage />} />
      </Route>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;