/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const ErrorShow = ({ error }: any) => {
  const navigate = useRouter();
  if (!error || !error.data) {
    return null;
  }

  if (
    error.status === 403 ||
    error.status === 401 ||
    error.data.message === 'jwt expired'
  ) {
    // removeFromLocalStorage(authKey);
    toast.error(error.data.message || 'Unknown error occurred', {
      description: 'Please login again.',
      action: {
        label: 'Login',
        onClick: () => {
          navigate.push('/login');
        },
      },
    });
  }

  return (
    <div className="error-container p-4 bg-red-100 border border-red-400 text-red-700 rounded-md max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-2">
        Error <span className="font-semibold"> {error.status}</span>
      </h1>
      <div>
        <p className="mb-2">
          {error.data.message || 'An unknown error has occurred.'}
        </p>
        {error.data.errorMessages?.map((errorMessage: any) => (
          <p key={errorMessage.path} className="text-sm">
            <strong className="font-semibold">{errorMessage.path}:</strong>{' '}
            {errorMessage.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ErrorShow;
