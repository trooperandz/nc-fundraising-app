// Shows options for materials etc donation options
import * as React from 'react';
import { json, Link, useNavigate } from '@remix-run/react';
import { LinksFunction, LoaderFunction } from '@remix-run/node';
import { donationApi, MaterialsInventory } from '../services/api';
import { useLoaderData } from '@remix-run/react';
import { useAppContext } from '../providers/AppProvider';
// @ts-ignore
import stylesheet from '../styles/donate-material.css?url'; // TODO: get index.d.ts to fix this type error
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { classNames, formatToDollars } from '../utils';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

interface Props {}

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const response = await donationApi.get('/tools_materials_inventory');

    return json(response.data);
  } catch (error) {
    throw new Response('Failed to load materials', { status: 500 });
  }
};

export default function DonateMaterial() {
  const {
    customDonation,
    presetDonation,
    materialDonations,
    materialDonationsTotalCost,
    setMaterialDonations,
  } = useAppContext();

  const navigate = useNavigate();

  const materials = useLoaderData<MaterialsInventory>();

  const [error, setError] = React.useState('');

  const handleCounterChange = (
    id: number,
    name: string,
    quantity: number,
    price: number,
    deliveryType: string,
  ) => {
    if (quantity > 0) {
      setError('');

      const updatedMaterialsDonation = {
        name,
        quantity,
        price,
        deliveryType,
      };

      setMaterialDonations({
        ...materialDonations,
        [id]: updatedMaterialsDonation,
      });
    }
  };

  const handleDeliveryTypeChange = (id: number, value: string) => {
    const updatedMaterialsDonation = {
      ...materialDonations[id],
      deliveryType: value,
    };

    setMaterialDonations({
      ...materialDonations,
      [id]: updatedMaterialsDonation,
    });
  };

  const handleContinue = () => {
    if (
      materialDonationsTotalCost === 0 &&
      !presetDonation &&
      !customDonation
    ) {
      setError('Please make a selection before proceeding!');
    } else {
      navigate('/contact-information');
    }
  };

  return (
    <Layout>
      <div className="relative flex flex-col flex-1 items-center">
        <BackButton onClick={() => navigate(-1)} />

        <h2 className="mb-12">Donate Materials</h2>

        {materials?.length > 0 ? (
          <div className="w-full max-w-xl">
            {materials.map(item => {
              return (
                <div
                  key={item.id}
                  className="px-4 pt-3 mb-4 bg-gray-100 rounded-md"
                >
                  <h4>{item.item_name}</h4>
                  <div className="flex flex-row items-center">
                    <p className="flex flex-1 text-green-600">
                      {formatToDollars(item.unit_price)}
                    </p>
                    <div className="flex flex-1 items-center">
                      <label
                        htmlFor={`quantity-${item.id}`}
                        className="hidden md:inline mr-4 text-gray-500 font-light"
                      >
                        Quantity
                      </label>
                      <select
                        id={`quantity-${item.id}`}
                        name={`quantity-${item.id}`}
                        className={classNames(
                          'w-full min-w-14 rounded-md border border-gray-300 py-1.5',
                          'sm:text-sm text-center text-base/5 font-medium text-gray-700 shadow-sm',
                          'focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500',
                        )}
                        value={
                          materialDonations[item.id]
                            ? materialDonations[item.id].quantity
                            : 0
                        }
                        onChange={(
                          event: React.ChangeEvent<HTMLSelectElement>,
                        ) => {
                          handleCounterChange(
                            item.id,
                            item.item_name,
                            Number(event.target.value),
                            item.unit_price,
                            materialDonations[item.id] &&
                              materialDonations[item.id].deliveryType
                              ? materialDonations[item.id].deliveryType
                              : 'financial',
                          );
                        }}
                      >
                        {Array.from({
                          length: item.quantity_remaining + 1,
                        }).map((_, index) => {
                          return (
                            <option key={`${item.id}-${index}`} value={index}>
                              {index}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="py-2">
                      <label className="flex items-center space-x-2 cursor-pointer ml-6">
                        <input
                          className="form-radio"
                          type="radio"
                          name={`materials-donation-type-${item.id}`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleDeliveryTypeChange(item.id, e.target.value)
                          }
                          value="financial"
                          checked={
                            materialDonations[item.id]
                              ? materialDonations[item.id].deliveryType ===
                                'financial'
                              : false
                          }
                        />
                        <span className="text-blue-500">Donation</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer ml-6">
                        <input
                          className="form-radio"
                          type="radio"
                          name={`materials-donation-type-${item.id}`}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleDeliveryTypeChange(item.id, e.target.value)
                          }
                          value="delivery"
                          checked={
                            materialDonations[item.id]
                              ? materialDonations[item.id].deliveryType ===
                                'delivery'
                              : false
                          }
                        />
                        <span className="text-blue-500">Delivery</span>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <Button text="Continue" onClick={handleContinue} />

        <Link
          to={`/donate-financial`}
          className="text-blue-600 underline mt-6 text-center"
        >
          Want to make a financial donation?
        </Link>

        {error && <p className="tex-lg text-red-700 mt-8">{error}</p>}
      </div>
    </Layout>
  );
}
