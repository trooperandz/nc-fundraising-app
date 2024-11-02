// Page for general About Us info
import * as React from 'react';
import Layout from '../components/Layout';

interface Props {}

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center">
        <h2 className="mb-12">About Us</h2>
        <p>No Homo</p>
      </div>
    </Layout>
  );
}
