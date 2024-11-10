// Checkout confirmation page after payment has processed
import * as React from 'react';
import { Link, useLocation } from '@remix-run/react';
import Layout from '../components/Layout';
import { ShareIcon } from '@heroicons/react/24/solid';
import { AppContext, useAppContext } from '../providers/AppProvider';

export default function CheckoutConfirmation() {
  const { resetAppState } = useAppContext();
  const [cartState, setCartState] = React.useState<AppContext>();
  const location = useLocation();
  console.log({ cartState });

  React.useEffect(() => {
    const storage = localStorage.getItem('appState');

    // Clear any saved user/cart info on successful checkout
    if (storage) {
      setCartState(JSON.parse(storage) as AppContext);
    }

    return () => {
      localStorage.removeItem('appState');
      resetAppState();
    };
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h2 className="mb-8">Thank you for helping to rebuild Hot Springs!</h2>

        <p className="mb-8">
          A confirmation email has been sent to {cartState?.registerUser.email}.
        </p>

        {/* TODO: get address from David and determine presentation of materials (same table as cart overview?) */}
        {cartState && cartState.materialDonationsTotalBreakdown.delivery > 0 ? (
          <p className="text-gray-500 ml-2 mb-8">
            Please send your delivery materials to: David Wagner
          </p>
        ) : null}

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
