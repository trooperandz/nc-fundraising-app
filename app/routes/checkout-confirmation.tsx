// Checkout confirmation page after payment has processed
import * as React from "react";
import { Link } from "@remix-run/react";

interface Props {}

export default function CheckoutConfirmation() {
  return (
    <div>
      <div>Checkout Confirmation</div>

      <Link to={`/`}>Back to home</Link>
    </div>
  );
}
