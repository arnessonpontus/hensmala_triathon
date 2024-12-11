import { createContext, useState, useContext, ReactNode } from "react";

interface ConsentBannerState {
  isOpen: boolean;
  showBanner: () => void;
  hideBanner: () => void;
}

const ConsentBannerContext = createContext<ConsentBannerState | undefined>(undefined);

export const useConsentBanner = () => {
  const context = useContext(ConsentBannerContext);
  if (!context) {
    throw new Error('useConsentBanner must be used within an ConsentBannerProvider');
  }
  return context;
};

interface ConsentBannerProviderProps {
  children: ReactNode;
}

export const ConsentBannerProvider = ({ children }: ConsentBannerProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const showBanner = () => setIsOpen(true);
  const hideBanner = () => setIsOpen(false);

  return (
    <ConsentBannerContext.Provider value={{ isOpen, showBanner, hideBanner }}>
      {children}
    </ConsentBannerContext.Provider>
  );
};
