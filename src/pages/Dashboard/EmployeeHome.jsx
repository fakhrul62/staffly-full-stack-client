import React from "react";
import useAuth from "../../hooks/useAuth";

const EmployeeHome = () => {
    const {user} = useAuth();
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold font-bebas tracking-widest text-zinc-900 inline-block ">
          Welcome,{" "}
          <span className="border-b-4 border-blue-400 pb-1">
            {user?.displayName}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default EmployeeHome;
