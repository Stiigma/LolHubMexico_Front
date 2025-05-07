import React from 'react';

// Tipado de las props
interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// Componente funcional tipado
const AuthButton: React.FC<AuthButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 w-full font-semibold rounded-md mt-2"
      {...rest}
    >
      {children}
    </button>
  );
};

export default AuthButton;
