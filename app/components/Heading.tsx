import React from 'react';

type Props = {
  title: string;
};

export default function Heading({ title }: Props) {
  return <h2 className="mb-6 md:mb-10 mt-0 md:mt-2">{title}</h2>;
}
