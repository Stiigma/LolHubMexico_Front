import React, { createContext, useContext, useState } from "react";
import ProfileModal from "../feactures/user/components/ProfileModal";
import { useUser } from "./UserContext";

interface ProfileModalContextType {
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

const ProfileModalContext = createContext<ProfileModalContextType | undefined>(undefined);

export const useProfileModal = () => {
  const context = useContext(ProfileModalContext);
  if (!context) {
    throw new Error("useProfileModal must be used within a ProfileModalProvider");
  }
  return context;
};

export const ProfileModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const openProfileModal = () => setIsOpen(true);
  const closeProfileModal = () => setIsOpen(false);

  return (
    <ProfileModalContext.Provider value={{ openProfileModal, closeProfileModal }}>
      {children}

      {isOpen && user && (
        <ProfileModal
          onClose={closeProfileModal}
          user={{
            username: user.userName,
            email: user.email,
            role: user.role || "Jugador",
            avatarUrl: user.profileImage || "/assets/avatars/avatar1.png",
          }}
        />
      )}
    </ProfileModalContext.Provider>
  );
};
