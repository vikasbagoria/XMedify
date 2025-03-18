import React from "react";
import HospitalCard from "./HospitalCard";

const HospitalsList = ({ hospitals }) => {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-semibold">Medical Centers Available</h2>
      {hospitals.length === 0 ? (
        <p className="text-gray-500">No hospitals found.</p>
      ) : (
        hospitals.map((hospital) => <HospitalCard key={hospital["Provider ID"]} hospital={hospital} />)
      )}
    </div>
  );
};

export default HospitalsList;
