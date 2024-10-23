// Root page displaying contribution options
import * as React from 'react';
import { Link } from '@remix-run/react';
import {
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';
import Layout from '../components/Layout';

interface Props {}

export default function Root() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex items-center mb-5">
          <CurrencyDollarIcon className="size-8 text-green-500 mr-2" />
          <Link to={`/donate-financial`}>
            <button className="font-bold border-2 border-gray-300 rounded-xl px-2 py-2">
              Make a Financial Donation
            </button>
          </Link>
        </div>
        <div className="flex items-center">
          <WrenchScrewdriverIcon className="size-6 text-amber-500 mr-2" />
          <Link to={`/donate-material`}>
            <button className="font-bold border-2 border-gray-300 rounded-xl px-2 py-2">
              Purchase or Donate Materials
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
