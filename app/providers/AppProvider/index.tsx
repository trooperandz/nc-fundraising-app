import * as React from 'react';

export type MaterialDonation = {
  [id: number]: {
    quantity: number;
    price: number;
    deliveryType: string;
  };
};

export type RegisterUser = {
  name: string;
  email: string;
  phone: string;
};

export type AppContext = {
  user: string | undefined;
  customDonation: string;
  materialDonations: MaterialDonation;
  presetDonation: string | undefined;
  registerUser: RegisterUser;
  setCustomDonation: (customDonation: string) => void;
  setMaterialDonations: (materialDonation: MaterialDonation) => void;
  setPresetDonation: (presetDonation: string | undefined) => void;
  setRegisterUser: (user: RegisterUser) => void;
  setUser: (user: string) => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<string>();
  const [materialDonations, setMaterialDonations] = React.useState<any>({});
  const [presetDonation, setPresetDonation] = React.useState<any>();
  const [registerUser, setRegisterUser] = React.useState<RegisterUser>({
    name: '',
    email: '',
    phone: '',
  });
  const [customDonation, setCustomDonation] = React.useState<any>();

  return (
    <AppContext.Provider
      value={{
        customDonation,
        materialDonations,
        presetDonation,
        registerUser,
        setCustomDonation,
        setMaterialDonations,
        setPresetDonation,
        setRegisterUser,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
