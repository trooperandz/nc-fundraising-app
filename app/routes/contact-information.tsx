// Contact information form
import * as React from 'react';
import { useFetcher, useNavigate, useNavigation } from '@remix-run/react';
import { Donor, useAppContext } from '../providers/AppProvider';
import Layout from '../components/Layout';
import { formatPhoneNumber } from '../utils';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Heading from '../components/Heading';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { donationApi } from '../services/api';

interface Props {}

const nameRegex = /^[A-Za-z\s]*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const phone_number = formData.get('phone');

  const donorData = {
    name,
    email,
    phone_number,
  };

  try {
    const response = await donationApi.post<Donor>('/donors', donorData);
    console.log({ response });
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error creating donor:', error);
    throw new Response('Failed to create donor', { status: 500 });
  }
};

export default function ContactInformation() {
  const { donor, registerUser, setDonor, setRegisterUser } = useAppContext();
  console.log({ donor });
  const navigate = useNavigate();
  const navigation = useNavigation();
  const fetcher = useFetcher<FormData>();

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  const isLoading =
    fetcher.state === 'submitting' ||
    fetcher.state === 'loading' ||
    navigation.state === 'loading';

  const fetcherData = fetcher.data;

  // TODO: check this return data; does it return the action return, or the data returned?
  React.useEffect(() => {
    if (fetcherData) {
      console.log('fetcherData: ', fetcherData);
      localStorage.setItem('donor', JSON.stringify(fetcherData));
      setDonor(fetcherData as Donor);
      navigate('/checkout-review');
    }
  }, [fetcherData]);

  const handleChangeText = (value: string, key: string) => {
    let updatedErrors = { ...errors };

    switch (key) {
      case 'name':
        if (nameRegex.test(value)) {
          setRegisterUser({ ...registerUser, [key]: value });
          updatedErrors.name = '';
        }
        break;
      case 'email':
        setRegisterUser({ ...registerUser, [key]: value });
        updatedErrors.email = '';
        break;
      case 'phone':
        let sanitizedValue = value.replace(/[^0-9]/g, '');
        setRegisterUser({ ...registerUser, [key]: sanitizedValue });
        updatedErrors.phone = '';
        break;
    }

    setErrors(updatedErrors);
  };

  const handleSubmit = () => {
    let newErrors = {
      name: '',
      email: '',
      phone: '',
    };

    if (!registerUser.name || !nameRegex.test(registerUser.name)) {
      newErrors.name = 'Please enter a valid name';
    }

    if (!registerUser.email || !emailRegex.test(registerUser.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!registerUser.phone || !phoneRegex.test(registerUser.phone)) {
      newErrors.phone = 'Please enter a valid phone number with ten digits';
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.phone) {
      return fetcher.submit(
        {
          email: registerUser.email,
          name: registerUser.name,
          phone: registerUser.phone,
        },
        { method: 'post' },
      );
    } else {
      return;
    }
  };

  return (
    <Layout>
      <div className="relative flex flex-col items-center">
        <BackButton onClick={() => navigate(-1)} />

        <Heading title="Enter Your Contact Information" />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col w-full max-w-md items-center">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-light leading-6 text-gray-500"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeText(e.target.value, 'name')
                  }
                  value={registerUser?.name}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <small className="text-red-700">{errors.name}</small>
                )}
              </div>

              <label
                htmlFor="email"
                className="block text-sm font-light leading-6 mt-3 text-gray-500"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeText(e.target.value, 'email')
                  }
                  value={registerUser?.email}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <small className="text-red-700">{errors.email}</small>
                )}
              </div>

              <label
                htmlFor="phone"
                className="block text-sm font-light leading-6 mt-3 text-gray-500"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeText(e.target.value, 'phone')
                  }
                  value={formatPhoneNumber(registerUser?.phone)}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.phone && (
                  <small className="text-red-700">{errors.phone}</small>
                )}
              </div>
            </div>

            <Button text="Continue" onClick={handleSubmit} />
          </div>
        )}
      </div>
    </Layout>
  );
}
