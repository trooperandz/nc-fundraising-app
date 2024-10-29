// Review cart/delivery items before finalizing checkout
import * as React from 'react';
import { Link, useNavigate, useNavigation } from '@remix-run/react';
import Layout from '../components/Layout';
import CartOverview from '../components/CartOverview';
// @ts-ignore
import stylesheet from '../styles/cart.css?url'; // TODO: get index.d.ts to fix this type error
import { LinksFunction } from '@remix-run/node';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

interface Props {}

export default function CheckoutReview() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="relative flex flex-col items-center">
        <div className="absolute top-0 left-0 cursor-pointer">
          <div
            onClick={() => navigate(-1)}
            className="flex flex-row items-center text-blue-600 hover:text-indigo-500"
          >
            <ArrowLeftCircleIcon className="w-10 h-10" />
            <p className="ml-1">Back</p>
          </div>
        </div>
        <h2 className="mb-12">Review Your Donation</h2>

        <CartOverview />

        <button
          onClick={() => navigate('/checkout')}
          type="button"
          className="rounded-md bg-blue-600 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36"
        >
          Proceed to Checkout
        </button>
      </div>
    </Layout>
  );
}
