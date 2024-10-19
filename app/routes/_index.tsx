// Root route displaying contribution options
import * as React from "react";
import { Link } from "@remix-run/react";

interface Props {}

export default function Root() {
  return (
    <div>
      <div>
        <Link to={`/donate-financial`}>Donate Financially</Link>
      </div>
      <div>
        <Link to={`/donate-material`}>Purchase or Donate Tools/Materials</Link>
      </div>
    </div>
  );
}
