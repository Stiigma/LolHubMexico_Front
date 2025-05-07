import { Routes, Route } from 'react-router-dom';
import HomePage from '../feactures/home/pages/HomePage';
import LoginPage from '../feactures/auth/pages/LoginPage';
import RegisterPage from '../feactures/auth/pages/RegisterPage';
// puedes agregar más rutas como LoginPage aquí

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;