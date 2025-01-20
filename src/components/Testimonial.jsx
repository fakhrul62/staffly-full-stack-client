import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  const testimonials = [
    {
      text: "Staffly has completely transformed our HR processes. Onboarding is now seamless and efficient!",
      author: "John D., HR Manager",
    },
    {
      text: "Tracking attendance and payroll has never been easier. Highly recommend!",
      author: "Sarah L., Business Owner",
    },
    {
      text: "A must-have tool for any company looking to simplify employee management.",
      author: "Michael T., Operations Head",
    },
    {
      text: "The analytics and reporting features provide deep insights into our workforce.",
      author: "Lisa R., HR Analyst",
    },
    {
      text: "Customer support is top-notch. They helped us set up everything smoothly!",
      author: "David P., IT Director",
    },
    {
      text: "Our productivity has skyrocketed since we started using this system.",
      author: "Emma W., Project Manager",
    },
    {
      text: "Payroll automation has saved us so much time and effort every month.",
      author: "James K., Finance Lead",
    },
    {
      text: "The compliance and security features give us peace of mind.",
      author: "Sophia M., Legal Consultant",
    },
    {
      text: "Performance tracking has made employee reviews more transparent and fair.",
      author: "Ryan B., Team Lead",
    },
    {
      text: "It's an all-in-one solution that every growing company needs!",
      author: "Jessica A., CEO",
    },
  ];
  return (
    <div className="my-20">
      <div>
        <h2 className="font-body text-center text-zinc-900 font-bold text-2xl mb-2">
          Testimonials
        </h2>
        <p className="text-center font-head text-zinc-800 mb-8">
            See what our customers have to say about Staffly
        </p>
      </div>
      <div
        data-hs-carousel='{
                            "loadingClasses": "opacity-0",
                            "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer",
                            "slidesQty": {
                                "xs": 1,
                                "lg": 3
                            },
                            "isDraggable": true
                            }'
        className="relative"
      >
        <div className="hs-carousel w-full overflow-hidden bg-white rounded-lg">
          <div className="relative min-h-72 -mx-1">
            <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap opacity-0 cursor-grab transition-transform duration-700 hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="hs-carousel-slide px-1">
                  <div className="flex justify-center h-full bg-gray-100 border shadow-lg p-6">
                    <span className="self-center space-y-5 text-sm text-gray-800 transition duration-700">
                      <span className="text-5xl text-zinc-400">
                        <FaQuoteLeft />
                      </span>
                      <p className="text-xl font-head">{testimonial.text}</p>
                      <h2 className="font-body font-semibold">
                        {testimonial.author}
                      </h2>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-s-lg"
        >
          <span className="text-2xl" aria-hidden="true">
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-e-lg"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg
              className="shrink-0 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </span>
        </button>

        <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2"></div>
      </div>
    </div>
  );
};

export default Testimonial;
