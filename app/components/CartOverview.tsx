// Cart summary/overview page
import { LinksFunction } from '@remix-run/node';
import * as React from 'react';
import { MaterialDonation, useAppContext } from '../providers/AppProvider';

interface Props {}

export default function Cart() {
  const {
    customDonation,
    donationDollarTotal,
    presetDonation,
    materialDonations,
    materialDonationsTotalCost,
  } = useAppContext();

  const materialDonationIds = Object.keys(materialDonations);
  return (
    <div>
      {customDonation || presetDonation ? (
        <div>
          <h3 className="text-gray-600">Financial Donation:</h3>
          <p className="font-bold">
            ${Number(customDonation || presetDonation).toFixed(2)}
          </p>
        </div>
      ) : null}

      <br />

      {materialDonationIds.length > 0 ? (
        <div>
          <h3 className="text-gray-600 mt-2">Materials Donations:</h3>

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
                <td>${materialDonationsTotalCost.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : null}

      <h3 className="text-gray-600 mt-7">Total Contribution:</h3>
      <p className="font-bold">
        $
        {(
          Number(customDonation || presetDonation) + materialDonationsTotalCost
        ).toFixed(2)}
      </p>
    </div>
  );
}
