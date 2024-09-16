import { createPortal } from 'react-dom';
import {
  createContext,
  useContext,
  ComponentProps,
  useState,
  useCallback,
  useMemo,
} from 'react';

import Modal from '@shared/Modal';

type ModalProps = ComponentProps<typeof Modal>;
type ModalOptions = Omit<ModalProps, 'open'>;

interface ModalContextValue {
  open: (options: ModalOptions) => void;
  close: () => void;
}

const Context = createContext<ModalContextValue | undefined>(undefined);

const defaultValues: ModalProps = {
  open: false,
  body: null,
  onLeftButtonClick: () => {},
  onRightButtonClick: () => {},
};

export function ModalContext({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState(defaultValues);

  const $portal_root = document.getElementById('root-portal');

  const open = useCallback((options: ModalOptions) => {
    setModalState({ ...options, open: true });
  }, []);
  const close = useCallback(() => {
    setModalState(defaultValues);
  }, []);

  const values = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root && createPortal(<Modal {...modalState} />, $portal_root)}
    </Context.Provider>
  );
}

export function useModalContext() {
  const values = useContext(Context);

  if (!values) {
    throw new Error('ModalContext 안에서 사용해주세요.');
  }

  return values;
}
