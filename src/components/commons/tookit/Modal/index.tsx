// components/Modal/index.tsx
import React, { useImperativeHandle, forwardRef } from "react";
import { useModalContext } from "@contexts/ModalContext";
import { ModalProps, ModalMethods } from "./types";

// Substitua pelo seu modal real, ou use MUI, Chakra, ou o seu próprio estilo
import { Container } from "./styles";

export const Modal = forwardRef<ModalMethods, ModalProps>((props, ref) => {
  const { visible, closeModal, openModal } = useModalContext();

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
      props.onOpen?.();
    },
    close: () => closeModal(),
  }));

  if (!visible) return null;

  return (
    <div className="backdrop">
      <Container>
        <button onClick={closeModal}>Fechar</button>
        {props.children}
      </Container>
    </div>
  );
});

Modal.displayName = "Modal";
