import * as React from 'react';

export type MaterialDonation = {
  name: string;
  quantity: number;
  price: number;
  deliveryType: string;
};

export type MaterialDonations = {
  [id: number]: MaterialDonation;
};

export type RegisterUser = {
  name: string;
  email: string;
  phone: string;
};

export type AppContext = {
  user: string | undefined;
  customDonation: string;
  donationDollarTotal: string;
  materialDonations: MaterialDonations;
  materialDonationsTotalCost: number;
  presetDonation: string | undefined;
  registerUser: RegisterUser;
  setCustomDonation: (customDonation: string) => void;
  setMaterialDonations: (materialDonations: MaterialDonations) => void;
  setPresetDonation: (presetDonation: string | undefined) => void;
  setRegisterUser: (user: RegisterUser) => void;
  setUser: (user: string) => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<string>();
  const [materialDonations, setMaterialDonations] =
    React.useState<MaterialDonations>({});
  const [presetDonation, setPresetDonation] = React.useState<any>();
  const [registerUser, setRegisterUser] = React.useState<RegisterUser>({
    name: '',
    email: '',
    phone: '',
  });
  const [customDonation, setCustomDonation] = React.useState<any>();

  const materialDonationsTotalCost = React.useMemo(() => {
    return Object.keys(materialDonations).reduce((acc, id) => {
      const donation: MaterialDonation = materialDonations[id];

      acc += Number(donation.price * donation.quantity);

      return acc;
    }, 0);
  }, [materialDonations]);

  return (
    <AppContext.Provider
      value={{
        customDonation,
        donationDollarTotal: (
          Number(customDonation || presetDonation) + materialDonationsTotalCost
        ).toFixed(2),
        materialDonations,
        materialDonationsTotalCost,
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
