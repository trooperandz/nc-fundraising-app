// Cart summary/overview page
import * as React from 'react';
import { Link } from '@remix-run/react';
import CartOverview from '../components/CartOverview';
import stylesheet from '../styles/cart.css?url'; // TODO: get index.d.ts to fix this type error
import { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

interface Props {}

export default function Cart() {
  return (
    <div className="flex flex-col flex-1">
      <CartOverview />

      <Link to={`/checkout-review`}>Proceed to Checkout</Link>
    </div>
  );
}
