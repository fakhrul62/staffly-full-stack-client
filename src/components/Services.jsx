import React from "react";

const Services = () => {
  return (
    <div className="my-20">
      <div>
        <h2 className="font-body text-center text-zinc-900 font-bold text-2xl mb-2">
          Our Services
        </h2>
        <p className="text-center font-head text-zinc-800 mb-8">
          Empower Your Workforce with Seamless Employee Management
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border border-zinc-300 p-6 rounded-xl shadow-lg">
          <img className="w-20" src="https://i.ibb.co.com/0nRTFdL/commitment.png" />
          <h3 className="font-semibold font-head text-xl text-black mt-5">Employee Onboarding</h3>
          <p>Streamline hiring and onboarding with automated workflows.</p>
        </div>
        <div className="border border-zinc-300 p-6 rounded-xl shadow-lg">
          <img className="w-20" src="https://i.ibb.co.com/4ZRPLVj/performance.png" />
          <h3 className="font-semibold font-head text-xl text-black mt-5">Attendance Tracking</h3>
          <p>Monitor employee check-ins, work hours, and leave requests.</p>
        </div>
        <div className="border border-zinc-300 p-6 rounded-xl shadow-lg">
          <img className="w-20" src="https://i.ibb.co.com/KshxdQB/hand.png" />
          <h3 className="font-semibold font-head text-xl text-black mt-5">Payroll Management</h3>
          <p>Automate salary calculations, tax deductions, and payslips.</p>
        </div>
        <div className="border border-zinc-300 p-6 rounded-xl shadow-lg">
          <img className="w-20" src="https://i.ibb.co.com/vwPXjDg/to-do-list.png" />
          <h3 className="font-semibold font-head text-xl text-black mt-5">Task & Project Management</h3>
          <p>Assign tasks, set deadlines, and track progress.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
