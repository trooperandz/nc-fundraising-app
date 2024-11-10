// Checkout page with Stripe payment info with summary of transaction/cart at top
import * as React from 'react';
import { Link } from '@remix-run/react';
import Layout from '../components/Layout';
import { useAppContext } from '../providers/AppProvider';

interface Props {}

export default function Checkout() {
  const { setCustomDonation, setMaterialDonations, setPresetDonation } =
    useAppContext();

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h2 className="mb-10">Checkout</h2>

        <p>Stripe goes here...</p>

        <Link to={`/checkout-confirmation`} className="mt-12">
          <button
            onClick={() => {
              setPresetDonation(0);
              setCustomDonation(0);
              setMaterialDonations({});
            }}
            type="button"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36"
          >
            Submit Payment
          </button>
        </Link>
      </div>
    </Layout>
  );
}
