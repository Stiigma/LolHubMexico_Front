import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { registerUser } from '../services/authService';
import type { CreateUserDTO } from '../types/CreateUserDTO';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [FullName, setFullName] = useState('');
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Nacionality, setNacionality] = useState('');
  const [PasswordHash, setPasswordHash] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (PasswordHash !== ConfirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const newUser: CreateUserDTO = {
      FullName,
      UserName,
      Email,
      PhoneNumber,
      PasswordHash,
      ConfirmPassword,
      Nacionality,
    };

    try {
      await registerUser(newUser);
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Error al registrar');
    }
  };

  return (
    <AuthLayout title="Crea tu cuenta">
      <form onSubmit={handleRegister} className="w-full">
        <AuthInput
          type="text"
          placeholder="Nombre completo"
          value={FullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <AuthInput
          type="text"
          placeholder="Nombre de usuario"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <AuthInput
          type="email"
          placeholder="Correo electrónico"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthInput
          type="tel"
          placeholder="Número de teléfono (+52...)"
          pattern="^\+52\d{10}$"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <AuthInput
          type="password"
          placeholder="Contraseña"
          value={PasswordHash}
          onChange={(e) => setPasswordHash(e.target.value)}
          required
        />
        <AuthInput
          type="password"
          placeholder="Confirmar contraseña"
          value={ConfirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <AuthInput
          type="Nacionalidad"
          placeholder="Confirmar nacionalidad"
          value={Nacionality}
          onChange={(e) => setNacionality(e.target.value)}
          required
        />

        {/* Mensaje de error */}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <AuthButton>Registrarse</AuthButton>

        <p className="text-sm mt-2 text-center">
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-white font-bold cursor-pointer hover:underline"
          >
            Inicia sesión aquí
          </span>
        </p>

        <AuthButton onClick={() => navigate("/")} type="button" className="bg-blue-800 mt-4">
          Volver al Inicio
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
