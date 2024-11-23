import * as React from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  useNavigate,
  useRouteError,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
// @ts-ignore
import tailwindStyles from './styles/tailwind.css?url'; // TODO: get index.d.ts to fix this type error
// @ts-ignore
import appStyles from './styles/index.css?url';
import { AppProvider } from './providers/AppProvider';
// @ts-ignore
import WhiskyGirlImage from './images/whisky-girl.jpg';
import ErrorScreen from './components/ErrorScreen';
import Button from './components/Button';
import Layout from './components/Layout';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: appStyles },
];

export function meta() {
  return [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    // other meta tags
  ];
}

export default function App() {
  return (
    <html className="h-full bg-gray-100">
      <head>
        <link rel="icon" type="image/png" href={WhiskyGirlImage} />
        <link rel="apple-touch-icon" href={WhiskyGirlImage} />
        <title>Help Rebuild Hot Springs</title>
        <Meta />
        <Links />
        {/* Share buttons */}
        <script
          type="text/javascript"
          src="https://platform-api.sharethis.com/js/sharethis.js#property=674218f07b87400012b9592e&product=inline-share-buttons&source=platform"
          async
        ></script>
      </head>
      <body className="h-full">
        <AppProvider>
          <Outlet />
          <Scripts />
        </AppProvider>
      </body>
    </html>
  );
}

// TODO: this is supposed to catch errors, but it's not working when I throw an error in a route like so:
// throw new Error('This is a test error!');
export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);
  return (
    <html>
      <head>
        <link rel="icon" type="image/png" href={WhiskyGirlImage} />
        <link rel="apple-touch-icon" href={WhiskyGirlImage} />
        <title>Error</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <ErrorScreen>
            <h2>Sorry, an unexpected error occurred.</h2>

            <Button text="Reload" onClick={() => navigate('/')} />
          </ErrorScreen>
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}
