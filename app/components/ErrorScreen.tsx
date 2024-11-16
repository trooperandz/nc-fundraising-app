import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function ErrorScreen({ children }) {
  return (
    <div className="flex flex-col w-full h-full items-center mt-40">
      <ExclamationTriangleIcon className="size-24 text-amber-400" />
      {children}
    </div>
  );
}
