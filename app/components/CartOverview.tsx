// Cart summary/overview page
import { LinksFunction } from '@remix-run/node';
import * as React from 'react';
import { MaterialDonation, useAppContext } from '../providers/AppProvider';
import { formatToDollars } from '../utils';
import {
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/16/solid';

interface Props {}

export default function Cart() {
  const {
    customDonation,
    presetDonation,
    materialDonations,
    materialDonationsTotalCost,
  } = useAppContext();

  const materialDonationIds = Object.keys(materialDonations);
  return (
    <div>
      {customDonation || presetDonation ? (
        <div className="flex items-center mb-4">
          <CurrencyDollarIcon className="size-8 text-green-500 mr-2" />
          <h3 className="text-gray-600">Financial Donation:</h3>
          <p className="font-bold ml-3">
            {formatToDollars(Number(customDonation || presetDonation))}
          </p>
        </div>
      ) : null}

      <br />

      {materialDonationIds.length > 0 ? (
        <div className="mb-8">
          <div className="flex items-center">
            <WrenchScrewdriverIcon className="size-6 text-amber-500 mr-2" />
            <h3 className="text-gray-600 mt-2">Materials Donations:</h3>
          </div>

          <div className="border border-gray-200 w-full my-2" />

          <table>
            <thead>
              <tr>
                <th className="w-32">Item Name</th>
                <th className="px-3">Quantity</th>
                <th className="px-3">Unit Price</th>
                <th className="px-3 w-22">Method</th>
                <th className="px-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {materialDonationIds.map(id => {
                const item: MaterialDonation = materialDonations[id];

                return (
                  <tr>
                    <td className="pl-6">{item.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="pl-6">${item.price.toFixed(2)}</td>
                    <td className="py-2">{item.deliveryType.toUpperCase()}</td>
                    <td className="text-center">
                      ${(item.quantity * Number(item.price)).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="pl-6">Total:</td>
                <td />
                <td />
                <td />
                <td>{formatToDollars(materialDonationsTotalCost)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : null}

      {materialDonationsTotalCost ? (
        <div className="flex items-center mt-7 mb-6">
          <>
            <h3 className="text-gray-600">Total Contribution:</h3>
            <p className="font-bold ml-3 text-green-600">
              {formatToDollars(
                Number(customDonation || presetDonation) +
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
