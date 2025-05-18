import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { loginUser } from '../services/authService';
import type { LoginUserDTO } from '../types/LoginUserDTO';
import type { UserDTO } from '../../../shared/types/User/UserDTO';
import { useUser } from "../../../context/UserContext"

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
        password
      }
      const result = await loginUser(credencials);
      console.log(result.user);
      // Puedes guardar token o usuario en localStorage si aplica
      localStorage.setItem('token', result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      const user: UserDTO = {
        idUser: result.user.idUser,
        userName: result.user.userName,
        email: result.user.email,
        role: result.user.role,
        token: result.token,
      };
      console.log(user);
      setUser(user);
      console.log("Hizo set usuario");
      navigate('/teams/preview');
    } catch (err: any) {
      try {
        const jsonError = JSON.parse(err.message); // si err.message es JSON string
        setError(jsonError.message || 'Error al iniciar sesión');
      } catch {
        setError(err.message || 'Error al iniciar sesión');
      }
    }
  };

  return (
    <AuthLayout title="Inicia sesión">
      <form onSubmit={handleLogin} className="w-full">
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

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <AuthButton>Iniciar sesión</AuthButton>

        <p className="text-sm mt-4 text-center">
          <a href="#" className="text-gray-300 hover:underline">¿Olvidaste tu contraseña?</a>
        </p>

        <p className="text-sm mt-2 text-center">
          ¿No tienes cuenta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-white font-bold cursor-pointer hover:underline"
          >
            Crea una aquí
          </span>
        </p>

        <AuthButton onClick={() => navigate("/")} type="button" className="bg-blue-800 mt-4">
          Volver al Inicio
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;