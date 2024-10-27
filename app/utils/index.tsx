export const formatToDollars = (amount: number | string) =>
  amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// Format phone number to (555) 555-5555 format
export const formatPhoneNumber = (text: string) => {
  if (text.length <= 3) {
    return text;
  }

  if (text.length > 3 && text.length < 7) {
    return `(${text.slice(0, 3)}) ${text.slice(3)}`;
  }

  if (text.length >= 7) {
    return `(${text.slice(0, 3)}) ${text.slice(3, 6)}-${text.slice(6, 10)}`;
  }
};
