import React from 'react';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-(--color-secondary) text-white px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-(--color-accent) drop-shadow-md animate-pulse">
          404
        </h1>

        <p className="mt-4 text-2xl md:text-3xl font-semibold text-(--color-primary)">
          Oops! Page not found
        </p>

        <p className="mt-2 text-gray-300 max-w-md">
          Looks like this page took a wrong turn. Let’s get you back on track!
        </p>

        <div className="mt-8">
          <a
            href="/"
            className="btn btn-primary bg-(--color-primary) border-none hover:bg-(--color-accent) text-white"
          >
            Go Home
          </a>
        </div>
      </div>

      <div className="mt-12">
        <svg
          className="w-64 opacity-60 animate-bounce"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a2 2 0 002 2h3m10-12l2 2m-2-2v10a2 2 0 01-2 2h-3"
          />
        </svg>
      </div>
    </div>
    );
};

export default ErrorPage;