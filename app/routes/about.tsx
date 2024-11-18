// Page for general About Us info
import * as React from 'react';
import Layout from '../components/Layout';
import Heading from '../components/Heading';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useNavigation } from '@remix-run/react';

interface Props {}

export default function About() {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';
  return (
    <Layout>
      <div className="flex flex-col flex-1 items-center">
        <Heading title="Our Story" />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <p className="max-w-xl">
              Hot Springs experienced extreme damage from the overflowing of
              Spring Creek in September 2024 when hurricane Helena made
              landfall. This resulted in the downtown area being flooded by
              several feet, which greatly damaged many buildings along the main
              street.
            </p>
            <p className="max-w-xl mt-6">
              The community has come together to support each other and begin
              rebuilding the town and is asking for any help to assist in these
              efforts!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
