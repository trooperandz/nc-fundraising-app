// Contact information form
import * as React from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { useAppContext } from '../providers/AppProvider';
import Layout from '../components/Layout';

interface Props {}

const nameRegex = /^[A-Za-z\s]*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;

export default function ContactInformation() {
  const { registerUser, setRegisterUser } = useAppContext();

  const navigate = useNavigate();

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    phone: '',
  });
  console.log({ errors });
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
        let sanitizedValue = value.replace(/[^0-9-]/g, '');
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
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.phone) {
      navigate('/checkout-review');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h2>Your Contact Information</h2>

        <div style={{ width: '450px' }}>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 mt-6 text-gray-900"
          >
            Name
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
            className="block text-sm font-medium leading-6 mt-3 text-gray-900"
          >
            Email
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
            className="block text-sm font-medium leading-6 mt-3 text-gray-900"
          >
            Phone
          </label>
          <div className="mt-1">
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="5555555555"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeText(e.target.value, 'phone')
              }
              value={registerUser?.phone}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.phone && (
              <small className="text-red-700">{errors.phone}</small>
            )}
          </div>

          <button
            onClick={handleSubmit}
            type="button"
            className="rounded-md bg-blue-600 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
}
