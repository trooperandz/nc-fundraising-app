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
        <Link to={`/donate-financial`}>
          <div
            className="bg-gray-100 px-10 py-5 rounded-xl mb-8 shadow-sm"
            style={{ minWidth: '357px' }}
          >
            <div className="flex items-center">
              <CurrencyDollarIcon className="size-8 text-green-500 mr-2" />
              <button className="font-bold px-2 py-2">
                Make a Financial Donation
              </button>
            </div>
          </div>
        </Link>
        <Link to={`/donate-material`}>
          <div
            className="bg-gray-100 px-10 py-5 rounded-xl mb-8 shadow-sm"
            style={{ minWidth: '357px' }}
          >
            <div className="flex items-center">
              <WrenchScrewdriverIcon className="size-6 text-amber-500 mr-2" />
              <button className="font-bold px-2 py-2">
                Purchase or Donate Materials
              </button>
            </div>
          </div>
        </Link>
      </div>
    </Layout>
  );
}
