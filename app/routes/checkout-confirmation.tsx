// Checkout confirmation page after payment has processed
import * as React from 'react';
import { Link } from '@remix-run/react';
import Layout from '../components/Layout';
import { ShareIcon } from '@heroicons/react/24/solid';

interface Props {}

export default function CheckoutConfirmation() {
  React.useEffect(() => {
    // Clear any saved user/cart info on successful checkout
    localStorage.removeItem('appState');
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h2 className="mb-8">Thank you for helping to rebuild Hot Springs!</h2>

        <p className="mb-8">A confirmation email has been sent to...</p>

        <div className="flex items-center cursor-pointer">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
            <ShareIcon
              width={24}
              height={24}
              className="text-orange-400 mr-1"
            />
          </div>
          <p className="text-gray-500 ml-2 ">
            Please spread the word and let others know about your donation!
          </p>
        </div>

        <Link to={`/`} className="text-blue-600 underline mt-6">
          Back to home
        </Link>
      </div>
    </Layout>
  );
}
