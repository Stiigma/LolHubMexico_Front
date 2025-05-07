import React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ type = 'text', placeholder, ...rest }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2.5 mb-4 rounded-md bg-slate-700 text-white outline-none"
      {...rest}
    />
  );
};

export default AuthInput;
