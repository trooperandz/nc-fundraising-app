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
import Button from '../components/Button';
import e from 'express';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

const isProductionMode = process.env.NODE_ENV === 'production';

export const action = async ({ request }) => {
  const formData = await request.formData();

  const emailAddress = formData.get('emailAddress');
  const customDonation = formData.get('customDonation');
  const presetDonation = formData.get('presetDonation');
  const materialDonationsFinancial = formData.get('materialDonationsFinancial');
  const baseUrl = isProductionMode
    ? 'https://clownfish-app-pnafy.ondigitalocean.app'
    : 'http://localhost:3000';

  const data = {
    // TODO: email field is not pre-populating, don't know why (maybe because are in test mode?)
    customer_email: emailAddress,
    success_url: `${baseUrl}/checkout-confirmation`,
    cancel_url: `${baseUrl}/checkout-review`,
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
              Number(materialDonationsFinancial)) *
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
  materialDonationsFinancial: string;
}

export default function CheckoutReview() {
  const {
    customDonation,
    presetDonation,
    materialDonations,
    materialDonationsTotalBreakdown,
    registerUser,
  } = useAppContext();

  const [error, setError] = React.useState('');

  const fetcher = useFetcher<FormData>();

  const navigate = useNavigate();

  const isDonations =
    customDonation > 0 ||
    presetDonation > 0 ||
    materialDonationsTotalBreakdown.total > 0;

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

        <h2 className="mb-10">Review Your Donation</h2>

        {!registerUser.email && isDonations && (
          <p className="tex-lg text-red-700 mt-0 mb-8">
            Please edit your contact information.
          </p>
        )}

        <CartOverview />

        {error && <p className="tex-lg text-red-700 mt-2">{error}</p>}

        {isDonations ? (
          <Button
            text="Proceed to Payment"
            onClick={() => {
              if (!registerUser.email) {
                setError('You must enter your contact information.');
              } else {
                const state = {
                  customDonation,
                  presetDonation,
                  registerUser,
                  materialDonations,
                  materialDonationsTotalBreakdown,
                };

                localStorage.setItem('appState', JSON.stringify(state));

                return fetcher.submit(
                  {
                    emailAddress: registerUser.email,
                    customDonation,
                    presetDonation,
                    materialDonationsFinancial:
                      materialDonationsTotalBreakdown.financial,
                  },
                  { method: 'post' },
                );
              }
            }}
          />
        ) : null}
      </div>
    </Layout>
  );
}
