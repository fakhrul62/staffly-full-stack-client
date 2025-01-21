import React from "react";
import { FaArrowUpRightFromSquare, FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="my-20">
      <section class="bg-zinc-800 rounded-2xl overflow-hidden md:p-20 p-10">
        <div class="container mx-auto flex flex-wrap items-center">
          <div class="w-full md:w-1/2 px-6">
            <p class="text-white font-head uppercase mb-20">About Us</p>
            <h2 class="text-5xl font-bold font-body text-white">
              Recruitment Solutions
            </h2>
            <p class="text-white my-10">
              We provide top-tier recruitment solutions to help businesses find
              the best talent. Our approach ensures a seamless hiring process
              tailored to your needs.
            </p>
            <div class="mt-10 grid grid-cols-2 gap-6">
              <ul class=" text-white space-y-5">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-500 mr-2"></i> Social
                  Marketing
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-500 mr-2"></i> Marketing
                  Growth
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-500 mr-2"></i> Document
                  Management
                </li>
              </ul>
              <ul class="space-y-5 text-white">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-500 mr-2"></i> Corrective
                  Action Plan
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-500 mr-2"></i> HR Compliance
                  Audit
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-500 mr-2"></i> Unlimited
                  Project
                </li>
              </ul>
            </div>
            <Link
              to="/register"
              class="my-6 inline-block bg-white text-black px-6 py-3 rounded-full font-body shadow-md hover:bg-secondary-dark transition"
            >
          
              Sign Up Now
            </Link>
          </div>

          <div class="w-full md:w-1/2 px-6">
            <img
              src="https://i.ibb.co.com/KmgDhk0/pexels-mikhail-nilov-7731366.jpg"
              className="h-[500px] w-full object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
