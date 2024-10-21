import * as React from 'react';
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import stylesheet from './tailwind.css?url'; // TODO: get index.d.ts to fix this type error
import { AppProvider } from './providers/AppProvider';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider>
          <Outlet />
          <Scripts />
        </AppProvider>
      </body>
    </html>
  );
}
