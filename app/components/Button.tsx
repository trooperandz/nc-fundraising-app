import * as React from 'react';
import { classNames } from '../utils';

interface Props {
  style?: React.CSSProperties;
  text: string;
  onClick: () => void;
  styleClassNames?: string;
}

export default function Button({
  onClick,
  style,
  styleClassNames = '',
  text,
}: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        'flex items-center justify-center self-center rounded-md shadow-sm',
        'w-full md:w-auto',
        'mt-12 px-6 py-3',
        'font-semibold text-lg md:text-base text-white',
        'bg-blue-600 hover:bg-indigo-500',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        styleClassNames,
      )}
      style={style}
    >
      {text}
    </button>
  );
}
