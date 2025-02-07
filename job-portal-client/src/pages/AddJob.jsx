import React from "react";

const AddJob = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Add a Job Post</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input type="text" name="title" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Location:</label>
                    <input type="text" name="location" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Job Type:</label>
                    <input type="text" name="jobType" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <select name="category" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                        <option value="" disabled selected>Select a category</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Marketing">Marketing</option>
                     
                    </select>
                </div>
                {/* Job Type  */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                    JobType</label>
                    <select name="category" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
                        <option value="" disabled selected>Select a category</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Marketing">Marketing</option>
                     
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Application Deadline:</label>
                    <input type="date" name="applicationDeadline" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Salary Range (Min):</label>
                    <input type="number" name="min" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Salary Range (Max):</label>
                    <input type="number" name="max" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea name="description" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Company:</label>
                    <input type="text" name="company" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">HR Email:</label>
                    <input type="email" name="hr_email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">HR Name:</label>
                    <input type="text" name="hr_name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Company Logo URL:</label>
                    <input type="url" name="company_logo" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                </div>

                <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                    Submit Job Post
                </button>
            </div>
        </form>
    );
};

export default AddJob;
