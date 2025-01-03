// Review cart/delivery items before finalizing checkout
import * as React from 'react';
import {
  json,
  redirectDocument,
  useActionData,
  useFetcher,
  useNavigate,
  useNavigation,
  useRouteError,
} from '@remix-run/react';
import Layout from '../components/Layout';
import CartOverview from '../components/CartOverview';
// @ts-ignore
import stylesheet from '../styles/cart.css?url'; // TODO: get index.d.ts to fix this type error
import { LinksFunction, redirect } from '@remix-run/node';
import { useAppContext } from '../providers/AppProvider';
import { donationApi, DonationApiRecord } from '../services/api';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Heading from '../components/Heading';
import ErrorScreen from '../components/ErrorScreen';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  APP_STATE_STORAGE,
  DONOR_PUCHASE_PENDING_STORAGE,
} from '../utils/constants';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

const isProductionMode = process.env.NODE_ENV === 'production';

async function postDonorRecords(data) {
  const response = await donationApi.post<DonationApiRecord[]>(
    '/donations_array',
    data,
  );

  return response.data;
}

async function createStripeSession(data) {
  const response = await donationApi.post('/sessions', data);
  return response.data;
}

export const action = async ({ request }) => {
  const baseUrl = isProductionMode
    ? 'https://clownfish-app-pnafy.ondigitalocean.app'
    : 'http://localhost:3000';

  const formData = await request.formData();

  // Array of donations for db
  const donationsApiData = formData.get('donationsApiData');

  const emailAddress = formData.get('emailAddress');
  const customDonation = Number(formData.get('customDonation'));
  const presetDonation = Number(formData.get('presetDonation'));
  const materialDonationsFinancial = Number(
    formData.get('materialDonationsFinancial'),
  );

  const financialDonation = customDonation || presetDonation;

  // If only delivery donation, no need for stripe process
  const isDeliveryDonationOnly =
    !financialDonation && !materialDonationsFinancial;

  const stripeData = {
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
          // Required to be in cents
          unit_amount: (financialDonation + materialDonationsFinancial) * 100,
        },
        quantity: 1,
      },
    ],
  };

  // TODO: error testing on this block
  try {
    const donorPostResponse = await postDonorRecords(
      JSON.parse(donationsApiData),
    );

    if (donorPostResponse) {
      // Do not need to go through Stripe process if no $$ is due
      if (isDeliveryDonationOnly) {
        return json({ donorPostResponse });
        return redirect('/checkout-confirmation');
      } else {
        const stripeResponse = await createStripeSession(stripeData);
        // TODO: throw error if no url?
        if (stripeResponse.url) {
          return json({ stripeResponse, donorPostResponse });
          return redirect(stripeResponse.url);
        }
      }
    }
  } catch (error) {
    console.error('Error creating session or donations post:', error);
    throw new Response('Failed to create session or post donations', {
      status: 500,
    });
  }
};

interface FormData {
  emailAddress: string;
  customDonation: string;
  presetDonation: string;
  materialDonationsFinancial: string;
}

export default function CheckoutReview() {
  const {
    customDonation,
    donor,
    presetDonation,
    materialDonations,
    materialDonationsTotalBreakdown,
    registerUser,
  } = useAppContext();

  // This always returns undefined; seems like it's supposed to return the action response hmm
  // const actionData = useActionData();
  // console.log({ actionData });

  const [error, setError] = React.useState('');

  const fetcher = useFetcher<FormData>();

  const navigate = useNavigate();
  const navigation = useNavigation();

  // TODO: create action reusable hook (or one hook for loaders and actions)
  const isLoading =
    fetcher.state === 'submitting' ||
    fetcher.state === 'loading' ||
    navigation.state === 'loading';

  const isOnlyDeliveryDonations =
    customDonation === 0 &&
    presetDonation === 0 &&
    materialDonationsTotalBreakdown.financial === 0 &&
    materialDonationsTotalBreakdown.delivery > 0;

  const isDonations =
    customDonation > 0 ||
    presetDonation > 0 ||
    materialDonationsTotalBreakdown.total > 0;

  React.useEffect(() => {
    if (fetcher.data) {
      localStorage.setItem(
        DONOR_PUCHASE_PENDING_STORAGE,
        JSON.stringify(fetcher.data.donorPostResponse), // TODO: how to type this?
      );

      if (fetcher.data.stripeResponse) {
        console.log(
          'fetcher.data.sripeResponse.url: ',
          fetcher.data.stripeResponse.url,
        );
        // redirectDocument
        // window.location.replace(fetcher.data.stripeResponse.url);
        // window.location.assign(fetcher.data.stripeResponse.url);
        window.location.href = fetcher.data.stripeResponse.url;
        // navigate(fetcher.data.stripeResponse.url);
      }
    }
  }, [fetcher.data]);

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

        <Heading title="Review Your Contribution" />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {!registerUser.email && isDonations && (
              <p className="tex-lg text-red-700 mt-0 mb-8">
                Please edit your contact information.
              </p>
            )}

            <CartOverview />

            {error && <p className="tex-lg text-red-700 mt-2">{error}</p>}

            {isDonations ? (
              <Button
                text={
                  isOnlyDeliveryDonations ? 'Continue' : 'Proceed to Payment'
                }
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

                    let donationsRecords: DonationApiRecord[] = [];

                    if (donor && (presetDonation || customDonation)) {
                      donationsRecords.push({
                        donor_id: donor.id,
                        donation_type: 'cash',
                        amount: presetDonation || customDonation,
                        item_donated: null,
                        quantity_donated: null,
                        delivery_status: 'pending',
                      });
                    }

                    if (
                      donor &&
                      materialDonationsTotalBreakdown.total > 0 &&
                      materialDonations
                    ) {
                      Object.entries(materialDonations).forEach(
                        ([id, item]) => {
                          donationsRecords.push({
                            donor_id: donor.id,
                            donation_type: 'item',
                            amount: item.price,
                            item_donated: Number(id),
                            quantity_donated: item.quantity,
                            delivery_status:
                              item.deliveryType === 'financial'
                                ? 'pending'
                                : 'shipped_by_donor', // TODO: confirm
                          });
                        },
                      );
                    }

                    localStorage.setItem(
                      APP_STATE_STORAGE,
                      JSON.stringify(state),
                    );

                    if (isOnlyDeliveryDonations) {
                      // TODO: need to send POST record into /donations db
                      return fetcher.submit(
                        {
                          donationsApiData: JSON.stringify({
                            donations: donationsRecords,
                          }),
                        },
                        { method: 'post' },
                      );
                      navigate('/checkout-confirmation');
                    } else {
                      return fetcher.submit(
                        {
                          emailAddress: registerUser.email,
                          customDonation,
                          presetDonation,
                          materialDonationsFinancial:
                            materialDonationsTotalBreakdown.financial,
                          donationsApiData: JSON.stringify({
                            donations: donationsRecords,
                          }),
                        },
                        { method: 'post' },
                      );
                    }
                  }
                }}
              />
            ) : null}
          </>
        )}
      </div>
    </Layout>
  );
}

// ErrorBoundary to handle errors in this route
export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Handle unexpected errors
  return (
    <ErrorScreen>
      <h2>Sorry, an unexpected error occurred while creating your cart.</h2>

      <Button text="Reload" onClick={() => navigate('/')} />
    </ErrorScreen>
  );
}
