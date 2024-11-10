// Cart summary/overview page
import * as React from 'react';
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { MaterialDonation, useAppContext } from '../providers/AppProvider';
import { formatToDollars } from '../utils';
import {
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
    materialDonationsTotalBreakdown,
    registerUser,
    setCustomDonation,
    setPresetDonation,
    setMaterialDonations,
  } = useAppContext();

  const [deleteRequestType, setDeleteRequestType] = React.useState('');

  const isDonation =
    presetDonation > 0 ||
    customDonation > 0 ||
    materialDonationsTotalBreakdown.total > 0;
  const materialDonationIds = Object.keys(materialDonations);

  const navigate = useNavigate();

  return (
    <div className="relative flex flex-1 flex-col w-full max-w-lg items-center">
      {isDonation && (
        <div className="mb-6 w-full px-6 py-8 pt-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between mb-0">
            <div className="flex items-center mb-4 mt-2">
              <UserCircleIcon className="size-6 text-gray-500 mr-2" />
              <h3 className="text-gray-600">Contact Information:</h3>
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

      {customDonation > 0 || presetDonation > 0 ? (
        <div className="mb-6 w-full px-6 py-6 bg-gray-100 rounded-lg">
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
                  setDeleteRequestType('donate-financial');
                }}
                className="flex items-center text-gray-400 hover:text-red-500 cursor-pointer"
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
        <div className="mb-6 w-full px-6 py-6 bg-gray-100 rounded-lg">
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
                  setDeleteRequestType('donate-material');
                }}
                className="flex items-center text-gray-400 hover:text-red-500 mb-1 cursor-pointer"
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
                    <tr key={id}>
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
                  <td className="pl-4 pt-2 font-normal">Total:</td>
                  <td />
                  <td />
                  <td />
                  <td className="font-normal">
                    {formatToDollars(materialDonationsTotalBreakdown.total)}
                  </td>
                </tr>
                {materialDonationsTotalBreakdown.delivery > 0 && (
                  <>
                    <tr className="py-2">
                      <td
                        colSpan={2}
                        className="pl-4 pt-2 font-normal subtotal"
                      >
                        For Delivery
                      </td>
                      <td className="subtotal" />
                      <td className="subtotal" />
                      <td className="text-red-600 font-normal pt-2 subtotal">{`(${formatToDollars(
                        materialDonationsTotalBreakdown.delivery,
                      )})`}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="pl-4 pt-2">
                        Due now:
                      </td>
                      <td />
                      <td />
                      <td className="pt-2 text-center">
                        {formatToDollars(
                          materialDonationsTotalBreakdown.financial,
                        )}
                      </td>
                    </tr>
                  </>
                )}
              </tfoot>
            </table>
          </div>
        </div>
      ) : null}

      {materialDonationsTotalBreakdown.financial > 0 ? (
        <div className="flex items-center mt-7 mb-6">
          <>
            <h3 className="text-gray-600">Total Donation Due Now:</h3>
            <p className="font-bold ml-3 text-green-600">
              {formatToDollars(
                Number(customDonation || presetDonation || 0) + // TODO: fix 0 issue
                  materialDonationsTotalBreakdown.financial,
              )}
            </p>
          </>
        </div>
      ) : null}

      {!isDonation && (
        <div className="flex flex-col items-center mb-4 w-full px-6 py-6 bg-gray-100 rounded-lg">
          <ShoppingBagIcon className="size-24 text-gray-400" />

          <p className="mt-8">Your cart is currently empty.</p>

          <Button text="Make a Donation" onClick={() => navigate('/')} />
        </div>
      )}

      <Dialog
        open={!!deleteRequestType}
        onClose={() => setDeleteRequestType('')}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg">
            <DialogTitle className="font-bold">
              Confirm Donation Removal
            </DialogTitle>
            <Description>
              Are you sure you want to remove your{' '}
              {deleteRequestType === 'donate-financial'
                ? 'financial'
                : 'materials'}{' '}
              donation?
            </Description>
            <div className="flex gap-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
                onClick={() => setDeleteRequestType('')}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setDeleteRequestType('');

                  if (deleteRequestType === 'donate-financial') {
                    setCustomDonation(0);
                    setPresetDonation(0);
                  } else {
                    setMaterialDonations({});
                  }
                }}
              >
                Confirm
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
