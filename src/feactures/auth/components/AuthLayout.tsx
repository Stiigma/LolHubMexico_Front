import React from 'react';
import logo from '../../../assets/logo.png';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gradient-radial from-blue-900 to-gray-900 text-white flex flex-col justify-center items-center relative">
      <img src={logo} alt="Logo" className="h-20 mb-4" />
      <h1 className="text-3xl font-bold mb-8">HUB LOL</h1>
      <div className="bg-gray-900 p-8 rounded-xl w-80 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
        {children}
      </div>
      <footer className="absolute bottom-4 text-gray-400 text-sm flex items-center">
        <img src={logo} alt="logo" className="h-6 mr-2" />
        Company Yuppi
      </footer>
    </div>
  );
};

export default AuthLayout;
