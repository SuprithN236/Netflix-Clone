import React from "react";

const WatchPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-700 rounded-md shimmer w-40 h-6 mb-4"></div>
      <div className="bg-gray-700 rounded-md shimmer w-full h-96 mb-4"></div>
      <div className="bg-gray-700 rounded-md shimmer w-3/4 h-6 mb-2"></div>
      <div className="bg-gray-700 rounded-md shimmer w-1/2 h-6 mb-4"></div>
      <div className="bg-gray-700 rounded-md shimmer w-full h-24"></div>
    </div>
  );
};

export default WatchPageSkeleton;
