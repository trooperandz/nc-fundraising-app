// Checkout confirmation page after payment has processed
import * as React from 'react';
import { Link } from '@remix-run/react';
import Layout from '../components/Layout';

interface Props {}

export default function CheckoutConfirmation() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h2 className="mb-10">Thank you for helping to rebuild Hot Springs!</h2>

        <Link to={`/`}>Back to home</Link>
      </div>
    </Layout>
  );
}
