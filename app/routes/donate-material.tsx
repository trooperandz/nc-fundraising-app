// Shows options for materials etc donation options
import * as React from "react";
import { Link } from "@remix-run/react";

interface Props {}

export default function DonateMaterial() {
  return (
    <div>
      <div>Donate Material</div>
      <Link to={`/contact-information`}>Contact Information</Link>
    </div>
  );
}
