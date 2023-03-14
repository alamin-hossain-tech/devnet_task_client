import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">
          Sorry, we couldn't find the page you were looking for.
        </p>
        <Link className="mt-3" to="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
