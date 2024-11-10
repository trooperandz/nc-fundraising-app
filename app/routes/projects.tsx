// A page to display ongoing project info
import * as React from 'react';
import Layout from '../components/Layout';
import Heading from '../components/Heading';

interface Props {}

export default function Projects() {
  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center">
        <Heading title="Current Projects" />
        <p>We rebuilt this city...</p>
      </div>
    </Layout>
  );
}
