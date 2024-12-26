import { Link } from "react-router-dom";
import { useState, ReactNode, useEffect } from "react";
import Button from "../reuseables/CustomButton";

export function Error({ error, reset }: { error?: any; reset: () => void }) {
  return (
    <div className="fixed left-0 top-0 z-[9999] grid min-h-screen w-full place-items-center bg-background">
      <div className="group absolute left-3 top-3 transition hover:scale-95 sm:left-5 sm:top-5">
        <Link to="/" className="row-flex"></Link>
      </div>

      <div className="flex-column !items-center gap-10 px-3">
        <h3 className="line-clamp-5 max-w-[45ch] text-center text-2xl font-medium sm:text-3xl">
          Error | {error?.message ?? "Something went wrong"}.
        </h3>

        <Button
          title="Try again"
          onClick={() => {
            reset();
            // navigate("/");
          }}
          className="max-w-max !px-14 !py-8 !text-lg"
        />
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error: unknown, errorInfo: { componentStack: string }) => {
    console.error("[Error caught by ErrorBoundary:]", error, errorInfo);
    setHasError(true);
  };

  const resetError = () => setHasError(false);

  // The effect ensures that if there's any unhandled error, we can handle it
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (args[0] instanceof Error) {
        handleError(args[0], { componentStack: "" });
      } else {
        originalConsoleError(...args);
      }
    };

    return () => {
      console.error = originalConsoleError; // Restore the original console.error
    };
  }, []);

  console.log("Has Error", hasError);

  // If there's an error, render the fallback UI
  if (hasError) {
    return (
      <>
        <Error reset={resetError} />
      </>
    );
  }

  // Otherwise, render the children components
  return <>{children}</>;
};

export default ErrorBoundary;
