// A page to display ongoing project info
import * as React from 'react';
import Layout from '../components/Layout';

interface Props {}

export default function Projects() {
  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center">
        <h2 className="mb-12">Current Projects</h2>
      </div>
    </Layout>
  );
}
