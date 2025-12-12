import React from "react";
import { FaLock } from "react-icons/fa";

const ForbiddenPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <FaLock className="text-red-500 mx-auto mb-4" size={60} />

        <h1 className="text-6xl font-bold text-gray-800 mb-2">403</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Access Forbidden
        </h2>

        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>

        <a
          href="/"
          className="btn bg-primary text-white border-none px-6 py-2 rounded-md hover:bg-primary/80">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ForbiddenPage;
