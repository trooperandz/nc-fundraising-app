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
import Heading from '../components/Heading';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

interface Props {}

export default function Cart() {
  const { customDonation, presetDonation, materialDonationsTotalBreakdown } =
    useAppContext();

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center">
        <Heading title="Your Cart" />

        <CartOverview />

        {customDonation ||
        presetDonation ||
        materialDonationsTotalBreakdown.total ? (
          <Button
            text="Proceed to Payment"
            onClick={() => navigate('/checkout-review')}
          />
        ) : null}
      </div>
    </Layout>
  );
}
