import React, { useContext } from 'react';

import Swal from 'sweetalert2';
import AuthContext from '../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
    const { user } = useContext(AuthContext); // Get user from context
    const navigate = useNavigate(); // Initialize navigate function

    const handleAddJob = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());

        const { min, max, currency, ...newJob } = initialData;
        newJob.salaryRange = { min, max, currency };
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n');

        console.log(newJob); // Debugging

        try {
            const response = await fetch('http://localhost:5000/job-applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newJob),
            });

            const data = await response.json();
            console.log("Response Data:", data); // Debugging log

            if (data.insertedId) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Job has been added.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    navigate('/myPostedJobs'); // Navigate after alert disappears
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Job could not be added. Try again.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
            });
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2 className="text-3xl text-center text-red-200">Post a New Job</h2>
            <form onSubmit={handleAddJob} className="card-body">
                {/* Job Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Title</span>
                    </label>
                    <input type="text" name="title" placeholder="Job Title" className="input input-bordered" required />
                </div>

                {/* Job Location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input type="text" name="location" placeholder="Job Location" className="input input-bordered" required />
                </div>

                {/* Job Type */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Type</span>
                    </label>
                    <select name="jobType" className="select select-bordered w-full" required>
                        <option value="">Pick a Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Intern">Intern</option>
                        <option value="Part-time">Part-time</option>
                    </select>
                </div>

                {/* Job Field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Field</span>
                    </label>
                    <select name="jobField" className="select select-bordered w-full" required>
                        <option value="">Pick a Job Field</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Teaching">Teaching</option>
                    </select>
                </div>

                {/* Salary Range */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Salary Range</span>
                        </label>
                        <input type="text" name="min" placeholder="Min" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="text" name="max" placeholder="Max" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <select name="currency" className="select select-bordered w-full" required>
                            <option value="">Currency</option>
                            <option value="BDT">BDT</option>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                        </select>
                    </div>
                </div>

                {/* Job Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Description</span>
                    </label>
                    <textarea className="textarea textarea-bordered" placeholder="Job Description" name="description" required></textarea>
                </div>

                {/* Company Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Name</span>
                    </label>
                    <input type="text" name="company" placeholder="Company Name" className="input input-bordered" required />
                </div>

                {/* Job Requirements */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Requirements</span>
                    </label>
                    <textarea className="textarea textarea-bordered" placeholder="Put each requirement in a new line" name="requirements" required></textarea>
                </div>

                {/* Job Responsibilities */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Responsibilities</span>
                    </label>
                    <textarea className="textarea textarea-bordered" placeholder="Write each responsibility in a new line" name="responsibilities" required></textarea>
                </div>

                {/* HR Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Name</span>
                    </label>
                    <input type="text" name="hr_name" placeholder="HR Name" className="input input-bordered" required />
                </div>

                {/* HR Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Email</span>
                    </label>
                    <input type="email" readOnly defaultValue={user?.email} name="hr_email" placeholder="HR Email" className="input input-bordered" required />
                </div>

                {/* Application Deadline */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Deadline</span>
                    </label>
                    <input type="date" name="applicationDeadline" placeholder="Deadline" className="input input-bordered" required />
                </div>

                {/* Company Logo URL */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Logo URL</span>
                    </label>
                    <input type="url" name="company_logo" placeholder="Company Logo URL" className="input input-bordered" required />
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;
