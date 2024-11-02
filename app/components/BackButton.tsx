import React from 'react';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  onClick: () => void;
}

export default function BackButton({ onClick }: Props) {
  return (
    <div className="relative md:absolute top-0 left-0 self-start mb-4 cursor-pointer">
      <div
        onClick={onClick}
        className="flex flex-row items-center text-blue-600 hover:text-indigo-500"
      >
        <ArrowLeftCircleIcon className="w-8 h-8 md:w-10 md:h-10" />{' '}
        <p className="ml-1">Back</p>
      </div>
    </div>
  );
}
