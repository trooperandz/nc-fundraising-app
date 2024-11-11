// Shows options for financial-only donations
import * as React from 'react';
import { Link, useNavigate } from '@remix-run/react';
import { useAppContext } from '../providers/AppProvider';
import { json, LinksFunction, LoaderFunction } from '@remix-run/node';
import { donationApi } from '../services/api';
// @ts-ignore
import stylesheet from '../styles/donate-financial.css?url'; // TODO: get index.d.ts to fix this type error
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Heading from '../components/Heading';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

interface Props {}

const donationAmounts = [25, 50, 100, 150, 200, 250];

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await donationApi.get('/tools_materials_inventory');
    return json(response.data); // Return the data as JSON
  } catch (error) {
    throw new Response('Failed to load materials', { status: 500 });
  }
};

export default function DonateFinancial() {
  const {
    customDonation,
    materialDonationsTotalBreakdown,
    setCustomDonation,
    presetDonation,
    setPresetDonation,
  } = useAppContext();

  const navigate = useNavigate();

  const [error, setError] = React.useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^0-9.]/g, '');

    // Use regex to validate only numbers with at most one dot and two decimal places
    if (/^\d*\.?\d{0,2}$/.test(sanitizedValue)) {
      setError('');
      setPresetDonation(0);
      setCustomDonation(Number(sanitizedValue));
    }
  };

  const handleContinue = () => {
    if (
      !customDonation &&
      !presetDonation &&
      !materialDonationsTotalBreakdown.total
    ) {
      setError(
        'Please make a financial or materials donation before proceeding!',
      );
    } else {
      navigate('/contact-information');
    }
  };

  return (
    <Layout>
      <div className="relative flex flex-col flex-1 items-center">
        <BackButton onClick={() => navigate(-1)} />

        <Heading title="Make a Financial Donation" />

        <div className="flex flex-col w-full max-w-xl">
          <label
            htmlFor="dollar-input"
            className="block cursor-pointer mb-3 text-gray-500"
          >
            Select Amount
          </label>
          <div className="dollar-buttons w-full">
            {donationAmounts.map(donationAmount => {
              const isMatchingDonation = presetDonation === donationAmount;

              return (
                <button
                  key={donationAmount}
                  onClick={() => {
                    setError('');
                    setCustomDonation(0);
                    setPresetDonation(
                      presetDonation === donationAmount ? 0 : donationAmount,
                    );
                  }}
                  className={`font-bold border-2 border-green-500 min-w-16 rounded-xl px-2 py-2 ${
                    isMatchingDonation
                      ? 'bg-green-500 hover:bg-green-400 text-white'
                      : 'hover:bg-green-200'
                  }`}
                >
                  ${donationAmount}
                </button>
              );
            })}
          </div>

          <p className=" text-gray-500 mt-12 self-center">OR</p>

          <div className="mt-6 w-full">
            <label
              htmlFor="dollar-input"
              className="block cursor-pointer leading-6 text-gray-500"
            >
              Enter Custom Amount
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 text-md">$</span>
              </div>
              <input
                id="dollar-input"
                name="dollar-input"
                type="text"
                placeholder="0.00"
                aria-describedby="price-currency"
                className="block w-full rounded-md border-0 py-2.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
                onChange={handleInputChange}
                value={customDonation || undefined}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span id="price-currency" className="text-gray-500 text-md">
                  USD
                </span>
              </div>
            </div>
          </div>

          <Button text="Continue" onClick={handleContinue} />

          <Link
            to={`/donate-material`}
            className="text-blue-600 underline mt-6 text-center"
          >
            Want to make a materials donation?
          </Link>
        </div>

        {error && <p className="tex-lg text-red-700 mt-8">{error}</p>}
      </div>
    </Layout>
  );
}
