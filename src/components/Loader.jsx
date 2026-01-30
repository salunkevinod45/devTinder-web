import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="grid place-items-center h-screen mt-0.5">
        <div className="p-12 rounded shadow animate-bounce bg-cyan-600">
          <span className="loading loading-spinner text-primary"></span>
          <span className="loading loading-spinner text-secondary"></span>
          <span className="loading loading-spinner text-accent"></span>
          <span className="loading loading-spinner text-neutral"></span>
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-success"></span>
          <span className="loading loading-spinner text-warning"></span>
          <span className="loading loading-spinner text-error"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
