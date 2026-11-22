import React, { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

const testimonials = [
  {
    text: "Staffly has completely transformed our HR processes. Onboarding is now seamless and efficient!",
    name: "John D.",
    role: "HR Manager",
    initials: "JD",
  },
  {
    text: "Tracking attendance and payroll has never been easier. Highly recommend to any growing team!",
    name: "Sarah L.",
    role: "Business Owner",
    initials: "SL",
  },
  {
    text: "A must-have tool for any company looking to simplify employee management and daily ops.",
    name: "Michael T.",
    role: "Operations Head",
    initials: "MT",
  },
  {
    text: "The analytics and reporting features provide deep, actionable insights into our workforce.",
    name: "Lisa R.",
    role: "HR Analyst",
    initials: "LR",
  },
  {
    text: "Customer support is top-notch. They helped us set up everything smoothly from day one!",
    name: "David P.",
    role: "IT Director",
    initials: "DP",
  },
  {
    text: "Our productivity has skyrocketed since we started managing tasks and hours in Staffly.",
    name: "Emma W.",
    role: "Project Manager",
    initials: "EW",
  },
  {
    text: "Payroll automation has saved us so much time and manual effort every single month.",
    name: "James K.",
    role: "Finance Lead",
    initials: "JK",
  },
  {
    text: "The compliance and security controls give our leadership team complete peace of mind.",
    name: "Sophia M.",
    role: "Legal Consultant",
    initials: "SM",
  },
  {
    text: "Performance tracking has made employee reviews more transparent, structured, and fair.",
    name: "Ryan B.",
    role: "Team Lead",
    initials: "RB",
  },
  {
    text: "It's an all-in-one workforce solution that every modern, scaling company needs.",
    name: "Jessica A.",
    role: "CEO",
    initials: "JA",
  },
];

const getVisibleCount = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

const Testimonial = () => {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const nextCount = getVisibleCount();
      setVisibleCount(nextCount);
      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(0, testimonials.length - nextCount))
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-16 md:py-24">
      {/* Header Row with Aligned Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
        <div className="max-w-xl">
          <Badge variant="default" className="mb-4">
            Customer Stories
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Testimonials
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            See what HR managers, founders, and team leads have to say about
            running operations on Staffly.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-end">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            aria-label="Previous testimonials"
            className="h-10 w-10 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            aria-label="Next testimonials"
            className="h-10 w-10 rounded-full"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Button>
        </div>
      </div>

      {/* Equal-Height Testimonial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {visibleTestimonials.map((item) => (
          <Card
            key={item.name}
            className="group h-full flex flex-col justify-between p-6 sm:p-7 bg-white border-slate-200/80 hover:border-blue-300/80 hover:shadow-lg hover:shadow-blue-950/[0.04] hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                  <Quote className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div
                  className="flex items-center gap-0.5 text-amber-400"
                  aria-label="5 out of 5 stars"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      strokeWidth={1.75}
                    />
                  ))}
                </div>
              </div>

              <p className="text-[15px] leading-relaxed text-slate-700 font-normal">
                &ldquo;{item.text}&rdquo;
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-blue-100">
                <AvatarFallback className="bg-blue-50 text-blue-700 font-semibold text-xs">
                  {item.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500 truncate">{item.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Show testimonial group ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-7 bg-blue-600"
                : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
