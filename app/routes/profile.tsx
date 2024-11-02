// A page to display ongoing project info
import * as React from 'react';
import Layout from '../components/Layout';

interface Props {}

export default function Profile() {
  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center">
        <h2 className="mb-12">My Information</h2>
        <p>David Wagner Russia</p>
      </div>
    </Layout>
  );
}
