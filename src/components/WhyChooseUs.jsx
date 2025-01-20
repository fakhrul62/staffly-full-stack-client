import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="my-20">
      <div>
        <h2 className="font-body text-center text-zinc-900 font-bold text-2xl mb-2">
          Why People Choose us
        </h2>
        <p className="text-center font-head text-zinc-800 mb-8">
          Our customers love the value we provide
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-xl rounded-xl">
          <div className="p-4 md:px-5 md:py-7">
            <h3 className="text-lg font-bold text-gray-800">
              Expert Talent Matching
            </h3>
            <p className="mt-2 text-gray-500">
              Our AI-powered system ensures the best fit.
            </p>
          </div>
        </div>
        <div className="flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-xl rounded-xl">
          <div className="p-4 md:px-5 md:py-7">
            <h3 className="text-lg font-bold text-gray-800">
            Fast & Efficient Hiring
            </h3>
            <p className="mt-2 text-gray-500">
            Reduce hiring time by 50%.
            </p>
          </div>
        </div>
        <div className="flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-xl rounded-xl">
          <div className="p-4 md:px-5 md:py-7">
            <h3 className="text-lg font-bold text-gray-800">
            End-to-End Support
            </h3>
            <p className="mt-2 text-gray-500">
            From sourcing to onboarding, we handle it all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
