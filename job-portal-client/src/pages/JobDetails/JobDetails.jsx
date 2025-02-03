import {   NavLink, useLoaderData } from "react-router-dom";
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaEnvelope, FaUserTie } from "react-icons/fa";

const JobDetails = () => {
    const job = useLoaderData();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center items-center p-6">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl overflow-hidden p-8">
                {/* Company Info */}
                <div className="flex items-center gap-4">
                    <img src={job.company_logo} alt={job.company} className="w-20 h-20 object-contain rounded-lg shadow-md" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
                        <p className="text-gray-600">{job.company}</p>
                    </div>
                </div>

                {/* Job Meta Information */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                        <FaMoneyBillWave className="text-green-500" />
                        <span>{job.salaryRange.min} - {job.salaryRange.max} {job.salaryRange.currency.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                        <FaClock className="text-purple-500" />
                        <span>{job.jobType}</span>
                    </div>
                </div>

                {/* Job Description */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">Job Description</h2>
                    <p className="text-gray-600 mt-2">{job.description}</p>
                </div>

                {/* Requirements */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-green-500 pl-3">Requirements</h2>
                    <ul className="mt-2 text-gray-600 list-disc pl-5 space-y-1">
                        {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>

                {/* Responsibilities */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-purple-500 pl-3">Responsibilities</h2>
                    <ul className="mt-2 text-gray-600 list-disc pl-5 space-y-1">
                        {job.responsibilities.map((res, index) => (
                            <li key={index}>{res}</li>
                        ))}
                    </ul>
                </div>

                {/* HR Contact */}
                <div className="mt-6 p-4 bg-gray-100 rounded-lg flex flex-wrap items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaUserTie className="text-gray-700" />
                        <span className="text-gray-800 font-medium">{job.hr_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaEnvelope className="text-red-500" />
                        <span className="text-gray-700">{job.hr_email}</span>
                    </div>
                </div>

                {/* Apply Button */}
                <div className="mt-8 text-center">
                <NavLink to={`/jobApply/${job._id}`}>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed">
     Apply job
        </button>
      </NavLink>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
