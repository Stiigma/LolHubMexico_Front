import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { registerUser } from '../services/authService';
import type { CreateUserDTO } from '../types/CreateUserDTO';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Error al registrar');
      } else {
        setError('Error desconocido al registrar');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 px-4 text-white">
      {/* Logo */}
      <img src="/assets/logo.png" alt="Logo" className="w-24 h-24 mb-6" />

      {/* Card */}
      <div className="bg-blue-950 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Crea tu cuenta</h2>

        <form onSubmit={handleRegister} className="space-y-4">
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
            //pattern="^\\+52\\d{14}$"
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
            type="text"
            placeholder="Nacionalidad"
            value={Nacionality}
            onChange={(e) => setNacionality(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <AuthButton>Registrarse</AuthButton>

          <p className="text-sm text-center text-gray-300">
            ¿Ya tienes cuenta?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-white font-bold cursor-pointer hover:underline"
            >
              Inicia sesión
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

      {/* Footer */}
      <p className="text-gray-400 mt-8 text-sm">© Company Yuppi</p>
    </div>
  );
};

export default RegisterPage;
