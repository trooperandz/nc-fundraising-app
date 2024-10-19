// Contact information form
import * as React from "react";
import { Link } from "@remix-run/react";

interface Props {}

export default function ContactInformation() {
  return (
    <div>
      <div>Contact Information</div>

      <button>Submit</button>
      <br />
      <Link to={`/cart`}>View Cart</Link>
      <br />
      <Link to={`/checkout`}>Proceed to Checkout</Link>
    </div>
  );
}
