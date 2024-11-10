// Page for general About Us info
import * as React from 'react';
import Layout from '../components/Layout';
import Heading from '../components/Heading';

interface Props {}

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center">
        <Heading title="About Us" />
        <p>No Homo</p>
      </div>
    </Layout>
  );
}
