import React from "react";

interface Props {
  message: string;
  onClose?: () => void;
}

const ErrorAlert: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div className="bg-red-600 text-white px-4 py-3 rounded-md shadow flex items-center justify-between animate-fade-in">
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 font-bold text-lg"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
