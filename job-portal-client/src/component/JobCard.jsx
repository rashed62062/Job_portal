import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  // Format deadline date
  const formatDate = (dateString) => dateString ? dateString.slice(0, 10) : "Not specified";

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full mt-4 rounded-md max-w-md border border-gray-200 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Job Title & Badge */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
      </div>

      {/* Company Info */}
      <div className="flex gap-4 items-center my-4">
        <figure>
          <img
            className="w-14 h-14 object-cover rounded-full border"
            src={job.company_logo || "/default-logo.png"} // Fallback image
            alt={job.company}
          />
        </figure>
        <div>
          <h4 className="text-lg font-semibold">{job.company}</h4>
          <p className="text-gray-600 text-sm">{job.location}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-2 text-gray-700">
        <p className="flex items-center">
          📌 <span className="ml-2 font-medium">{job.category}</span>
        </p>
        <p className="flex items-center">
          🏢 <span className="ml-2">{job.jobType}</span>
        </p>
        <p className="flex items-center">
          ⏳ <span className="ml-2">Deadline: {formatDate(job.applicationDeadline)}</span>
        </p>
        <p className="text-sm text-gray-600">
          {job.description ? `${job.description.substring(0, 80)}...` : "No description available."}
        </p>
      </div>

      {/* Required Skills */}
      <div className="mt-3 flex flex-wrap gap-2">
        {job.requirements?.length > 0 ? (
          job.requirements.map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border">
              {skill}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No specific skills required</span>
        )}
      </div>

      {/* Salary Range */}
      <p className="mt-3 text-gray-800 font-medium">
        💰 Salary: {job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency?.toUpperCase()}
      </p>

      {/* Apply Button */}
      <Link to={`/jobDetails/${job._id}`}>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed">
     Vied details
        </button>
      </Link>
    </div>
  );
};

export default JobCard;
