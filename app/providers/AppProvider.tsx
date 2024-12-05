import * as React from 'react';

export type DeliveryType = 'delivery' | 'financial';

export type Donor = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
};

export type MaterialDonation = {
  name: string;
  quantity: number;
  price: number;
  deliveryType: DeliveryType;
};

export type MaterialDonations = {
  [id: number]: MaterialDonation;
};

export type RegisterUser = {
  name: string;
  email: string;
  phone: string;
};

export type MaterialDonationBreakdown = {
  delivery: number;
  financial: number;
  total: number;
};

export type AppContext = {
  user: string | undefined;
  customDonation: number;
  donor?: Donor;
  materialDonations: MaterialDonations;
  materialDonationsTotalBreakdown: MaterialDonationBreakdown;
  presetDonation: number;
  registerUser: RegisterUser;
  resetAppState: () => void;
  setCustomDonation: (customDonation: number) => void;
  setDonor: (donor: Donor) => void;
  setMaterialDonations: (materialDonations: MaterialDonations) => void;
  setPresetDonation: (presetDonation: number) => void;
  setRegisterUser: (user: RegisterUser) => void;
  setUser: (user: string) => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const defaultRegisterUser = {
  name: '',
  email: '',
  phone: '',
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [donor, setDonor] = React.useState<Donor>();
  const [user, setUser] = React.useState<string>();
  const [materialDonations, setMaterialDonations] =
    React.useState<MaterialDonations>({});
  const [customDonation, setCustomDonation] = React.useState<number>(0);
  const [presetDonation, setPresetDonation] = React.useState<number>(0);
  const [registerUser, setRegisterUser] =
    React.useState<RegisterUser>(defaultRegisterUser);

  React.useEffect(() => {
    const storageAppState = localStorage.getItem('appState');

    if (storageAppState) {
      const parsed = JSON.parse(storageAppState);

      setMaterialDonations(parsed.materialDonations);
      setPresetDonation(parsed.presetDonation);
      setCustomDonation(parsed.customDonation);
      setRegisterUser(parsed.registerUser);
    }
  }, []);

  const materialDonationsTotalBreakdown = React.useMemo(() => {
    return Object.keys(materialDonations).reduce(
      (acc, id) => {
        const materialDontation: MaterialDonation = materialDonations[id];
        const type = materialDontation.deliveryType;
        const isFinancial = type === 'financial';
        const total = Number(
          materialDontation.price * materialDontation.quantity,
        );

        if (isFinancial) {
          acc.financial += total;
        } else {
          acc.delivery += total;
        }
        acc.total += total;

        return acc;
      },
      { delivery: 0, financial: 0, total: 0 } as MaterialDonationBreakdown,
    );
  }, [materialDonations]);

  const resetAppState = () => {
    setCustomDonation(0);
    setMaterialDonations({});
    setPresetDonation(0);
    setRegisterUser(defaultRegisterUser);
  };

  return (
    <AppContext.Provider
      value={{
        customDonation,
        donor,
        materialDonations,
        materialDonationsTotalBreakdown,
        presetDonation,
        registerUser,
        resetAppState,
        setCustomDonation,
        setDonor,
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
