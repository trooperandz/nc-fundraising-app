import * as React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="mt-4">
        <p>Loading...</p>
      </div>
    </div>
  );
};
