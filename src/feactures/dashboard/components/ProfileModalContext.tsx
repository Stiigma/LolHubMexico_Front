import React, { createContext, useContext, useState } from "react";

interface ProfileModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ProfileModalContext = createContext<ProfileModalContextType | undefined>(undefined);

export const ProfileModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ProfileModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ProfileModalContext.Provider>
  );
};

export const useProfileModal = (): ProfileModalContextType => {
  const context = useContext(ProfileModalContext);
  if (!context) {
    throw new Error("useProfileModal debe usarse dentro de ProfileModalProvider");
  }
  return context;
};

