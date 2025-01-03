/**
 * For use relaying donor purchase information between stripe checkout -> checkout confirmation.
 * We must ensure that a donation is first "pending", and then "purchase" after the process is complete.
 * There is a chance that a user could have a bad connection or error between stripe processing and
 * the final checkout confirmation step. This information is iterated through and marked as "purchase" on checkout confirmation load.
 * Example data array:
 * [{
 *    id: 36,
 *    donor_id: 16,
 *    donation_type: 'cash',
 *    amount: 150,
 *    item_donated: null,
 *    quantity_donated: 0,
 *    delivery_status: 'pending'
 *  }]
 *
 *
 */
export const DONOR_PUCHASE_PENDING_STORAGE = 'donor-purchase-pending-record';

/**
 * For storing app state that needs to persist between stripe redirect and back
 * (user can go back during stripe session and would lose this data context otherwise)
 * {
 *   customDonation,
 *   presetDonation,
 *   registerUser,
 *   materialDonations,
 *   materialDonationsTotalBreakdown,
 * }
 **/
export const APP_STATE_STORAGE = 'appState';
