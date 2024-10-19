// Shows options for financial-only donations
import * as React from "react";
import { Link } from "@remix-run/react";

interface Props {}

export default function DonateFinancial() {
  return (
    <div>
      <div>Donate Financially</div>
      <Link to={`/contact-information`}>Contact Information</Link>
    </div>
  );
}
