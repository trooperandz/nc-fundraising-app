// Review cart/delivery items before finalizing checkout
import * as React from 'react';
import { useFetcher, useNavigate } from '@remix-run/react';
import Layout from '../components/Layout';
import CartOverview from '../components/CartOverview';
// @ts-ignore
import stylesheet from '../styles/cart.css?url'; // TODO: get index.d.ts to fix this type error
import { json, LinksFunction, redirect } from '@remix-run/node';
import { useAppContext } from '../providers/AppProvider';
import { donationApi } from '../services/api';
import BackButton from '../components/BackButton';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export const action = async ({ request }) => {
  const formData = await request.formData();

  const emailAddress = formData.get('emailAddress');
  const customDonation = formData.get('customDonation');
  const presetDonation = formData.get('presetDonation');
  const materialDonationsTotalCost = formData.get('materialDonationsTotalCost');

  const data = {
    // TODO: email field is not pre-populating, don't know why (maybe because are in test mode?)
    customer_email: emailAddress,
    success_url: 'http://localhost:3000/checkout-confirmation',
    cancel_url: 'http://localhost:3000/checkout-review',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name:
              customDonation || presetDonation
                ? 'Donation'
                : 'Materials Donation',
          },
          // In cents
          unit_amount:
            (Number(customDonation || presetDonation || 0) +
              Number(materialDonationsTotalCost)) *
            100,
        },
        quantity: 1,
      },
    ],
  };

  try {
    const response = await donationApi.post('/sessions', data);
    console.log({ response });

    return redirect(response.data.url);
  } catch (error) {
    console.error('Error creating session:', error);
    return json({ error: 'Unable to create session' }, { status: 500 });
  }
};

interface Props {}

interface FormData {
  emailAddress: string;
  customDonation: string;
  presetDonation: string;
  materialDonationsTotalCost: string;
}

export default function CheckoutReview() {
  const {
    customDonation,
    presetDonation,
    materialDonations,
    materialDonationsTotalCost,
    registerUser,
  } = useAppContext();

  const fetcher = useFetcher<FormData>();

  const navigate = useNavigate();

  const isDonations =
    customDonation || presetDonation || materialDonationsTotalCost;

  return (
    <Layout>
      <div className="relative flex flex-col w-full items-center">
        <BackButton
          onClick={() => {
            navigate(
              presetDonation || customDonation
                ? '/donate-financial'
                : '/donate-material',
            );
          }}
        />

        <h2 className="mb-12">Review Your Donation</h2>

        <CartOverview />

        {isDonations ? (
          <button
            onClick={() => {
              const cartItems = {
                customDonation,
                presetDonation,
                registerUser,
                materialDonations,
              };

              localStorage.setItem('appState', JSON.stringify(cartItems));

              return fetcher.submit(
                {
                  emailAddress: registerUser.email,
                  customDonation,
                  presetDonation,
                  materialDonationsTotalCost,
                },
                { method: 'post' },
              );
            }}
            type="button"
            className="rounded-md bg-blue-600 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-36"
          >
            Proceed to Checkout
          </button>
        ) : null}
      </div>
    </Layout>
  );
}
