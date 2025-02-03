import { useParams, useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";

import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const JobApply = () => {
    const { id } = useParams(); // Get job ID from the URL
    const job = useLoaderData(); // Get job data from loader
    const { user } = useContext(AuthContext); // Get user from context
    const [loading, setLoading] = useState(false); // Loading state for the submit button

    if (!job) return <p>Error: Job not found.</p>; // Handle case where job is not found

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form default submit action
        setLoading(true); // Set loading state to true

        const form = e.target; // Get the form element
        const applicationData = {
            jobId: id, // Include job ID in the data
            linkedin: form.linkedin.value,
            github: form.github.value,
            resume: form.resume.value,
            user: {
                name: user?.displayName || "Anonymous", // Fallback if user is not available
                email: user?.email || "No email provided", // Fallback for email
            },
        };

        fetch('http://localhost:5000/job-applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(applicationData),
        })
        .then((res) => res.text()) // Read the response as text first
        .then((text) => {
            try {
                return JSON.parse(text); // Parse JSON from text response
            } catch {
                throw new Error('Invalid JSON response from server'); // Handle invalid JSON error
            }
        })
        .then((data) => {
            setLoading(false); // Set loading state to false
            if (data.insertedId) { // Check if application was successfully inserted
                alert(data.insertedId)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Application Submitted Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch((error) => {
            setLoading(false); // Set loading state to false
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong!",
            });
        });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Apply for the Job</h1>
                    <p className="py-6">Submit your LinkedIn, GitHub, and Resume to apply. Job ID: {id}</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">LinkedIn URL</span>
                            </label>
                            <input type="url" name="linkedin" placeholder="LinkedIn URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">GitHub URL</span>
                            </label>
                            <input type="url" name="github" placeholder="GitHub URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Resume URL</span>
                            </label>
                            <input type="url" name="resume" placeholder="Resume URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Submitting..." : "Submit Application"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApply;
