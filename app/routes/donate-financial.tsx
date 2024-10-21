// Shows options for financial-only donations
import * as React from 'react';
import { Link } from '@remix-run/react';
import { useAppContext } from '../providers/AppProvider';
import { json, LoaderFunction } from '@remix-run/node';
import { donationApi } from '../services/api';

interface Props {}

const donationAmounts = ['25', '50', '100', '150', '200', '250'];

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
    setCustomDonation,
    presetDonation,
    setPresetDonation,
  } = useAppContext();

  console.log({ customDonation });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^0-9.]/g, '');

    // Use regex to validate only numbers with at most one dot and two decimal places
    if (/^\d*\.?\d{0,2}$/.test(sanitizedValue)) {
      setPresetDonation(undefined);
      setCustomDonation(sanitizedValue);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center">
      <h1 className="mb-12">Select Amount</h1>
      <div className="flex gap-x-6">
        {donationAmounts.map(donationAmount => {
          const isMatchingDonation = presetDonation === donationAmount;

          return (
            <button
              onClick={() => {
                setCustomDonation('');
                setPresetDonation(donationAmount);
              }}
              className={`font-bold border-2 border-green-600 min-w-16 rounded-xl px-2 py-2 bg-green-600 ${
                isMatchingDonation ? 'bg-white' : undefined
              }`}
            >
              ${donationAmount}
            </button>
          );
        })}
      </div>
      <div className="mt-8">
        <label
          htmlFor="dollar-input"
          className="block cursor-pointer mb-2 text-gray-500"
        >
          Custom Amount
        </label>
        <input
          className="border-2 border-gray-300 min-w-96 rounded-xl py-2 px-2"
          placeholder="Enter dollar amount"
          type="text"
          id="dollar-input"
          name="dollar-input"
          onChange={handleInputChange}
          style={{ minWidth: 500 }}
          value={customDonation}
        />
      </div>
      <Link to={`/contact-information`} className="mt-12">
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36"
        >
          Continue
        </button>
      </Link>
    </div>
  );
}
