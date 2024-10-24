// Cart summary/overview page
import * as React from 'react';
import { Link } from '@remix-run/react';
import CartOverview from '../components/CartOverview';
// @ts-ignore
import stylesheet from '../styles/cart.css?url'; // TODO: get index.d.ts to fix this type error
import { LinksFunction } from '@remix-run/node';
import Layout from '../components/Layout';
import { useAppContext } from '../providers/AppProvider';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

interface Props {}

export default function Cart() {
  const { customDonation, presetDonation, materialDonationsTotalCost } =
    useAppContext();

  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center">
        <h2 className="mb-12">Your Cart</h2>

        <CartOverview />

        {customDonation || presetDonation || materialDonationsTotalCost ? (
          <Link to={`/checkout-review`} className="mt-12">
            <button
              type="button"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36"
            >
              Proceed to Checkout
            </button>
          </Link>
        ) : null}
      </div>
    </Layout>
  );
}
