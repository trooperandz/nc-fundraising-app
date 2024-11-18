import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function ErrorScreen({ children }) {
  return (
    <div className="flex flex-col w-full h-full items-center mt-40">
      <ExclamationTriangleIcon className="size-20 text-gray-400 mb-4" />
      {children}
    </div>
  );
}
