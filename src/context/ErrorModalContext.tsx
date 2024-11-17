import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface ErrorModalContextType {
  isOpen: boolean;
  errorMessage: string;
  errorTitle: string;
  showErrorModal: (message: string, title?: string) => void;
  closeErrorModal: () => void;
}

export const ErrorModalContext = createContext<ErrorModalContextType | undefined>(undefined);

interface ErrorModalProviderProps {
  children: ReactNode;
}

export const ErrorModalProvider: React.FC<ErrorModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorModal = useCallback((message: string, title = "Ett fel uppstod") => {
    setErrorTitle(title);
    setErrorMessage(message);
    setIsOpen(true);
  }, []);

  const closeErrorModal = () => {
    setIsOpen(false);
    setErrorMessage('');
    setErrorTitle('');
  };

  return (
    <ErrorModalContext.Provider value={{ isOpen, errorTitle, errorMessage, showErrorModal, closeErrorModal }}>
      {children}
    </ErrorModalContext.Provider>
  );
};

export const useErrorModal = (): ErrorModalContextType => {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error('useErrorModal must be used within an ErrorModalProvider');
  }
  return context;
};
