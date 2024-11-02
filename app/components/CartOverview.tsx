// Cart summary/overview page
import * as React from 'react';
import { MaterialDonation, useAppContext } from '../providers/AppProvider';
import { formatToDollars } from '../utils';
import {
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  TrashIcon,
} from '@heroicons/react/16/solid';

interface Props {}

export default function Cart() {
  const {
    customDonation,
    presetDonation,
    materialDonations,
    materialDonationsTotalCost,
    setCustomDonation,
    setPresetDonation,
    setMaterialDonations,
  } = useAppContext();

  const materialDonationIds = Object.keys(materialDonations);
  return (
    <div className="relative flex flex-1 flex-col w-full max-w-lg items-center">
      {customDonation || presetDonation ? (
        <div className="mb-10 w-full px-6 py-6 bg-gray-100 rounded-lg">
          <div className="flex justify-between w-full mb-0">
            <div className="flex items-center">
              <CurrencyDollarIcon className="size-8 text-green-500 mr-2" />
              <h3 className="text-gray-600">Financial Donation</h3>
            </div>
            <div
              onClick={() => {
                setCustomDonation('');
                setPresetDonation('');
              }}
              className="flex items-center text-red-500 cursor-pointer"
            >
              <TrashIcon width={18} height={18} />
              <p className="ml-1">Remove</p>
            </div>
          </div>

          <div className="border border-gray-200 w-full my-3" />

          <p className="font-medium ml-3 self-start">
            {formatToDollars(Number(customDonation || presetDonation))}
          </p>
        </div>
      ) : null}

      <br />

      {materialDonationIds.length > 0 ? (
        <div className="mb-4 w-full px-6 py-6 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-between mb-0">
            <div className="flex items-center">
              <WrenchScrewdriverIcon className="size-6 text-amber-500 mr-2" />
              <h3 className="text-gray-600 mt-2">Materials Donations:</h3>
            </div>
            <div
              onClick={() => {
                setMaterialDonations({});
              }}
              className="flex items-center text-red-500 cursor-pointer"
            >
              <TrashIcon width={18} height={18} />
              <p className="ml-1">Remove</p>
            </div>
          </div>

          <div className="border border-gray-200 w-full my-3" />

          <div className="w-full overflow-x-auto px-4 py-4 bg-white rounded-lg">
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
              <tfoot className="py-4">
                <tr className="py-4">
                  <td className="pl-4 py-4">Total:</td>
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
        <p>Your cart is empty</p>
      ) : null}
    </div>
  );
}
