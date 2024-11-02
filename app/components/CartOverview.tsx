// Cart summary/overview page
import * as React from 'react';
import { MaterialDonation, useAppContext } from '../providers/AppProvider';
import { formatToDollars } from '../utils';
import {
  CurrencyDollarIcon,
  DocumentCurrencyDollarIcon,
  PencilSquareIcon,
  WrenchScrewdriverIcon,
  ShoppingBagIcon,
  XCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';
import { useNavigate } from '@remix-run/react';
import Button from './Button';

interface Props {}

export default function Cart() {
  const {
    customDonation,
    presetDonation,
    materialDonations,
    materialDonationsTotalCost,
    registerUser,
    setCustomDonation,
    setPresetDonation,
    setMaterialDonations,
  } = useAppContext();

  const materialDonationIds = Object.keys(materialDonations);
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-1 flex-col w-full max-w-lg items-center">
      {customDonation || presetDonation ? (
        <div className="mb-10 w-full px-6 py-6 bg-gray-100 rounded-lg">
          <div className="flex justify-between w-full mb-0">
            <div className="flex items-center mb-0">
              <DocumentCurrencyDollarIcon className="size-8 text-green-500 mr-2" />
              <h3 className="text-gray-600">Financial Donation</h3>
            </div>

            <div className="flex gap-2">
              <div
                onClick={() => {
                  navigate('/donate-financial');
                }}
                className="flex items-center cursor-pointer"
              >
                <PencilSquareIcon className="size-5 text-blue-600 hover:text-blue-400" />
              </div>
              <div
                onClick={() => {
                  setCustomDonation('');
                  setPresetDonation('');
                }}
                className="flex items-center text-red-500 hover:text-red-400 cursor-pointer"
              >
                <XCircleIcon className="size-5" />
              </div>
            </div>
          </div>

          <div className="divider" />

          <p className="font-medium ml-3 self-start">
            {formatToDollars(Number(customDonation || presetDonation))}
          </p>
        </div>
      ) : null}

      <br />

      {materialDonationIds.length > 0 ? (
        <div className="mb-4 w-full px-6 py-6 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-between mb-0">
            <div className="flex items-center mb-4 mt-2">
              <WrenchScrewdriverIcon className="size-6 text-amber-500 mr-2" />
              <h3 className="text-gray-600">Materials Donations</h3>
            </div>

            <div className="flex gap-2">
              <div
                onClick={() => {
                  navigate('/donate-material');
                }}
                className="flex items-center cursor-pointer mb-1"
              >
                <PencilSquareIcon className="size-5 text-blue-600 hover:text-blue-400" />
              </div>
              <div
                onClick={() => {
                  setMaterialDonations({});
                }}
                className="flex items-center text-red-500 hover:text-red-400 mb-1 cursor-pointer"
              >
                <XCircleIcon className="size-5" />
              </div>
            </div>
          </div>

          <div className="w-full px-4 py-4 bg-white rounded-lg overflow-x-scroll">
            <table className="m-auto">
              <thead>
                <tr className="text-gray-500 font-medium">
                  <th className="w-30 text-left pl-4">Item Name</th>
                  <th className="px-4">Quantity</th>
                  <th className="px-3">Price</th>
                  <th className="px-4 w-24">Method</th>
                  <th className="px-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {materialDonationIds.map(id => {
                  const item: MaterialDonation = materialDonations[id];

                  return (
                    <tr>
                      <td className="pl-4">{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">${item.price.toFixed(2)}</td>
                      <td className="py-2 text-center">
                        {item.deliveryType.charAt(0).toUpperCase() +
                          item.deliveryType.slice(1)}
                      </td>
                      <td className="text-center">
                        ${(item.quantity * Number(item.price)).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="pt-4">
                <tr className="py-4">
                  <td className="pl-4 pt-4">Total:</td>
                  <td />
                  <td />
                  <td />
                  <td>{formatToDollars(materialDonationsTotalCost)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : null}

      {materialDonationsTotalCost ? (
        <div className="flex items-center mt-7 mb-6">
          <>
            <h3 className="text-gray-600">Total Contribution:</h3>
            <p className="font-bold ml-3 text-green-600">
              {formatToDollars(
                Number(customDonation || presetDonation || 0) + // TODO: fix 0 issue
                  materialDonationsTotalCost,
              )}
            </p>
          </>
        </div>
      ) : null}

      {!presetDonation && !customDonation && !materialDonationsTotalCost ? (
        <div className="flex flex-col items-center mb-4 w-full px-6 py-6 bg-gray-100 rounded-lg">
          <ShoppingBagIcon className="size-24 text-gray-400" />

          <p className="mt-8">Your cart is currently empty.</p>

          <Button text="Back to Home" onClick={() => navigate('/')} />
        </div>
      ) : (
        <div className="mb-4 w-full px-6 py-8 pt-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between mb-0">
            <div className="flex items-center mb-4 mt-2">
              <UserCircleIcon className="size-6 text-gray-500 mr-2" />
              <h3 className="text-gray-600">Review Contact Info:</h3>
            </div>

            <div className="flex gap-2">
              <div
                onClick={() => {
                  navigate('/contact-information');
                }}
                className="flex items-center cursor-pointer pb-1"
              >
                <PencilSquareIcon className="size-5 text-blue-600 hover:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full px-6 py-6 bg-white rounded-lg overflow-x-scroll">
            <div className="flex items-center">
              <label className="mr-4 md:mr-6 text-gray-500">Name:</label>
              <p className="font-light">{registerUser.name}</p>
            </div>

            <div className="divider" />

            <div className="flex items-center">
              <label className="mr-4 md:mr-6 text-gray-500">Email:</label>
              <p className="font-light">{registerUser.email}</p>
            </div>

            <div className="divider" />

            <div className="flex items-center">
              <label className="mr-4 md:mr-6 text-gray-500">Phone:</label>
              <p className="font-light">{registerUser.phone}</p>
            </div>

            <div className="divider" />
          </div>
        </div>
      )}
    </div>
  );
}
