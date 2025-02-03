import { useEffect, useState } from "react";
import JobCard from "../../component/JobCard";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data)) // Store jobs in state
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🔥 Hot Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="text-center col-span-full text-gray-600">No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default HotJobs;
