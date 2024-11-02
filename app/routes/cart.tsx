// Cart summary/overview page
import * as React from 'react';
import { Link, useNavigate } from '@remix-run/react';
import CartOverview from '../components/CartOverview';
// @ts-ignore
import stylesheet from '../styles/cart.css?url'; // TODO: get index.d.ts to fix this type error
import { LinksFunction } from '@remix-run/node';
import Layout from '../components/Layout';
import { useAppContext } from '../providers/AppProvider';
import Button from '../components/Button';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

interface Props {}

export default function Cart() {
  const { customDonation, presetDonation, materialDonationsTotalCost } =
    useAppContext();

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center">
        <h2 className="mb-12">Your Cart</h2>

        <CartOverview />

        {customDonation || presetDonation || materialDonationsTotalCost ? (
          <Button
            text="Proceed to Checkout"
            onClick={() => navigate('/checkout-review')}
          />
        ) : null}
      </div>
    </Layout>
  );
}
