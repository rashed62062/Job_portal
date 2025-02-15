import React, { useEffect, useState } from 'react';
import UseAuth from '../../hooks/UseAuth';


const Myapplications = () => {
    const { user} = UseAuth()
    const [jobs, setJobs] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:5000/job-applications?email=${user?.email}`)
        .then(res => res.json())
        .then(data => setJobs(data))
    },[user.email])
    console.table({jobs});
    return (
        <div className="overflow-x-auto m-7">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name{jobs.length}</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
         {
          jobs.map(job=>   <tr key={job._id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={jobs.company_logo}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>Purple</td>
            <th>
              <button className="btn btn-ghost btn-xs bg-blue-300 hover:bg-red-500">delete</button>
            </th>
          </tr>)
         }
         
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
};

export default Myapplications;