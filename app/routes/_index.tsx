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
        <Link to={`/donate-financial`} className="w-full md:w-96">
          <div className="bg-gray-100 hover:bg-gray-200 px-2 md:px-10 py-5 rounded-xl mb-8 shadow-sm">
            <div className="flex items-center justify-center">
              <CurrencyDollarIcon className="size-8 text-green-500 sm:mr-1 md:mr-2" />
              <button className="font-bold px-2 py-2">
                Make a Financial Donation
              </button>
            </div>
          </div>
        </Link>

        <Link to={`/donate-material`} className="w-full md:w-96">
          <div className="bg-gray-100 hover:bg-gray-200 px-2 md:px-10 py-5 rounded-xl mb-8 shadow-sm">
            <div className="flex items-center justify-center">
              <WrenchScrewdriverIcon className="size-6 text-amber-500 sm:mr-1 md:mr-2" />
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
