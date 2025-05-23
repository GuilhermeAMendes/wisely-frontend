export interface ModalMethods {
  open: () => void;
  close: () => void;
}

export interface ModalProps {
  referenceSelector?: string;
  title: string;
  icon?: React.ReactElement;
  children?: React.ReactNode;
  buttonLabel?: string;
  handlerSubmit?: () => void;
  onOpen?: () => void;
}
