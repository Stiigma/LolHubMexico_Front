import React from "react";

interface ProfileModalProps {
  onClose: () => void;
  user: {
    username: string;
    email: string;
    role: string;
    avatarUrl: string;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, user }) => {
  return (
    <div>
      <button onClick={onClose}>Cerrar</button>
      <h2>{user.username}</h2>
      <img src={user.avatarUrl} alt="Avatar" />
      <p>{user.email}</p>
      <p>{user.role}</p>
    </div>
  );
};

export default ProfileModal;