import * as React from 'react';
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import tailwindStyles from './styles/tailwind.css?url'; // TODO: get index.d.ts to fix this type error
import appStyles from './styles/index.css?url';
import { AppProvider } from './providers/AppProvider';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: appStyles },
];

export default function App() {
  return (
    <html className="h-full bg-gray-100">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
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
