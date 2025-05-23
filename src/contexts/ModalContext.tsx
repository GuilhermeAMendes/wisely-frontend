import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  visible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <ModalContext.Provider value={{ visible, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModalContext must be used within a ModalProvider");
  return context;
}
