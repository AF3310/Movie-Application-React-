"use client";
import React from 'react';

interface ErrorDebuggerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ErrorDebugger({ children, fallback }: ErrorDebuggerProps) {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Error caught by ErrorDebugger:', error);
      setError(error.error);
      setHasError(true);
    };
 //Global listener for errors.
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="p-4 bg-red-900 text-white rounded">
        <h3 className="font-bold">Error occurred:</h3>
        <pre className="text-sm mt-2">{error?.message}</pre> {/* to output in correct format*/ }
        <pre className="text-xs mt-2 text-gray-300">{error?.stack}</pre>
        {fallback}
      </div>
    );
  }

  return <>{children}</>; //incase of no error, simply returns child element. 
} 