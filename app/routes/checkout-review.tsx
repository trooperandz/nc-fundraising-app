// Review cart/delivery items before finalizing checkout
import * as React from "react";
import { Link } from "@remix-run/react";

interface Props {}

export default function CheckoutReview() {
  return (
    <div>
      <div>Checkout Review</div>

      <Link to={`/cart`}>View Cart</Link>
      <br />
      <Link to={`/checkout`}>Proceed to Checkout</Link>
    </div>
  );
}
