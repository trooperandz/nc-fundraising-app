import * as React from 'react';
import { formatToDollars } from '../utils';
import { useAppContext } from '../providers/AppProvider';
import Button from './Button';
import { useLocation, useNavigate } from '@remix-run/react';

export default function FooterCart() {
  const {
    customDonation,
    presetDonation,
    materialDonationsTotalBreakdown,
    registerUser,
  } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();

  const totalDonationDollars =
    presetDonation + customDonation + materialDonationsTotalBreakdown.total;

  return location.pathname !== '/checkout-review' &&
    totalDonationDollars > 0 ? (
    <div
      className="fixed px-4 py-4 bottom-0 left-0 right-0 bg-white z-10"
      style={{ boxShadow: `0 -5px 15px rgba(0, 0, 0, 0.1)` }}
    >
      <div className="flex flex-row items-center justify-between">
        <h4>
          Total Donation:{' '}
          <span className="text-green-600">
            {formatToDollars(totalDonationDollars)}
          </span>
        </h4>
        <Button
          styleClassNames="bg-green-600 hover:bg-green-700"
          text="Checkout"
          onClick={() => {
            navigate(
              registerUser.email ? '/checkout-review' : '/contact-information',
            );
          }}
          style={{
            marginTop: 0,
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '4px',
            paddingBottom: '4px',
            fontSize: '16px',
            width: 'auto',
          }}
        />
      </div>
    </div>
  ) : null;
}
