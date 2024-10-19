// Cart summary/overview page
import * as React from "react";
import { Link } from "@remix-run/react";

interface Props {}

export default function Cart() {
  return (
    <div>
      <div>Cart</div>

      <Link to={`/checkout-review`}>Proceed to Checkout</Link>
    </div>
  );
}
