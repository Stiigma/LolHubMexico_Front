import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { loginUser } from '../services/authService';
import type { LoginUserDTO } from '../types/LoginUserDTO';
import type { UserDTO } from '../../../shared/types/User/UserDTO';
import { useUser } from '../../../context/UserContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [credencial, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const credencials: LoginUserDTO = {
        credencial,
        password,
      };

      const result = await loginUser(credencials);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      const user: UserDTO = {
        idUser: result.user.idUser,
        userName: result.user.userName,
        email: result.user.email,
        fullName: result.user.fullName,
        phoneNumber: result.user.phoneNumber,
        nacionality: result.user.nacionality,
        fechaRegistro: result.user.fechaRegistro,
        role: result.user.role,
        token: result.token,
        profileImage: result.user.profileImage || "/assets/avatars/avatar1.png",
      };

      setUser(user);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        try {
          const jsonError = JSON.parse(err.message);
          setError(jsonError.message || 'Error al iniciar sesión');
        } catch {
          setError(err.message || 'Error al iniciar sesión');
        }
      } else {
        setError('Error desconocido');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 px-4">
      <img src="/assets/logo.png" alt="Logo" className="w-24 h-24 mb-6" />
      <div className="bg-blue-950 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Inicia sesión</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <AuthInput
            type="email"
            placeholder="Correo electrónico"
            value={credencial}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <AuthInput
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <AuthButton>Iniciar sesión</AuthButton>

          <p className="text-sm text-center text-gray-300">
            <a href="#" className="hover:underline">¿Olvidaste tu contraseña?</a>
          </p>

          <p className="text-sm text-center text-gray-300">
            ¿No tienes cuenta?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-white font-bold cursor-pointer hover:underline"
            >
              Crea una aquí
            </span>
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
          >
            Volver al Inicio
          </button>
        </form>
      </div>

      <p className="text-gray-400 mt-8 text-sm">© Company Yuppi</p>
    </div>
  );
};

export default LoginPage;
