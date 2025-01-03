// Checkout confirmation page after payment has processed
import * as React from 'react';
import { json, Link, useFetcher, useNavigation } from '@remix-run/react';
import Layout from '../components/Layout';
import { AppContext, useAppContext } from '../providers/AppProvider';
import Heading from '../components/Heading';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  APP_STATE_STORAGE,
  DONOR_PUCHASE_PENDING_STORAGE,
} from '../utils/constants';
import { donationApi, DonationApiRecord } from '../services/api';

interface DonationDBRecord extends DonationApiRecord {
  id: number;
}

async function updateDonorPurchases(data) {
  console.log({ data });
  const response = await donationApi.put<DonationDBRecord[]>(
    '/donations_array',
    data,
  );

  // return response.data;
  return response;
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  // Array of donation purchase confirmation updates for db
  const donationsPurchaseData = formData.get('donationsPurchaseData');
  console.log({ donationsPurchaseData });
  // TODO: error testing on this block
  try {
    const response = await updateDonorPurchases(
      JSON.parse(donationsPurchaseData),
    );

    if (response) {
      // console.log({ response });
      console.log('response.data: ', response.data);
      return json({ success: true });
    }
  } catch (error) {
    console.error('Error updating donations purchase put:', error);
    throw new Response('Error updating donations purchase.', {
      status: 500,
    });
  }
};

export default function CheckoutConfirmation() {
  const { resetAppState } = useAppContext();
  const [cartState, setCartState] = React.useState<AppContext>();

  const fetcher = useFetcher();
  const navigation = useNavigation();

  const isLoading =
    fetcher.state === 'submitting' ||
    fetcher.state === 'loading' ||
    navigation.state === 'loading';

  React.useEffect(() => {
    const appStorage = localStorage.getItem(APP_STATE_STORAGE);

    const donorPendingData = localStorage.getItem(
      DONOR_PUCHASE_PENDING_STORAGE,
    );

    // TODO: if undefined, there is a problem
    if (donorPendingData) {
      const parsedPurchases = JSON.parse(donorPendingData);

      // Mark pending donations as "purchase" if not an item shipment, and execute an api patch update
      const updatedPurchaseRecords = parsedPurchases.map(
        (donation: DonationDBRecord) => {
          if (donation.delivery_status !== 'shipped_by_donor') {
            donation.delivery_status = 'purchase'; // Later will be marked as "purchased" after purvhasing & confirming a receipt of purchased goods
          }

          return donation;
        },
      );

      return fetcher.submit(
        {
          donationsPurchaseData: JSON.stringify({
            donations: updatedPurchaseRecords,
          }),
        },
        { method: 'patch' },
      );
    }

    // TODO: why is this here? Is it in case of error?
    if (appStorage) {
      setCartState(JSON.parse(appStorage) as AppContext);
    }

    // Clear any saved user/cart info on successful checkout
    return () => {
      localStorage.removeItem(APP_STATE_STORAGE);
      resetAppState();
    };
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Heading title="Thank you for helping to rebuild Hot Springs!" />

            <p className="mb-8">
              A confirmation email has been sent to{' '}
              {cartState?.registerUser.email}.
            </p>

            {/* TODO: get address from David and determine presentation of materials (same table as cart overview?) */}
            {cartState &&
            cartState.materialDonationsTotalBreakdown.delivery > 0 ? (
              <p className="text-gray-500 ml-2 mb-8">
                Please send your delivery materials to: David Wagner
              </p>
            ) : null}

            <div className="flex flex-col items-center">
              <p className="text-gray-500 ml-2 mb-4">
                Please spread the word and let others know about your donation!
              </p>
              <div className="sharethis-inline-share-buttons"></div>
            </div>

            <Link to={`/`} className="text-blue-600 underline mt-8">
              Back to home
            </Link>
          </>
        )}
      </div>
    </Layout>
  );
}
