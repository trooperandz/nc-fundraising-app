// Checkout page with Stripe payment info with summary of transaction/cart at top
import * as React from "react";
import { Link } from "@remix-run/react";

interface Props {}

export default function Checkout() {
  return (
    <div>
      <div>Checkout</div>

      <Link to={`/checkout-confirmation`}>Submit</Link>
      <br />
      <Link to={`/cart`}>View Cart</Link>
    </div>
  );
}
