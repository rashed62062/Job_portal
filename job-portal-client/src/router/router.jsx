import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import JobDetails from "../pages/JobDetails/JobDetails";
import JobApply from "../pages/Home/JobApply";
import PrivateRoute from "./PrivateRoute";
import Myapplications from "../pages/Myapplications/Myapplications";
import AddJob from "../pages/AddJob";
import MyPostedJobs from "../pages/Home/MyPostedJobs/MyPostedJobs";



  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <h2>Route not found</h2>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/jobDetails/:id',
            element:  <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,

            loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)

        },
            {
              path: 'jobApply/:id',
              element: <PrivateRoute><JobApply></JobApply></PrivateRoute>,
              loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)
              
            },
            {
              path: '/myApplications',
              element: <PrivateRoute><Myapplications></Myapplications></PrivateRoute>
          
              
            },
            {
              path:'/addJob',
              element: <PrivateRoute><AddJob></AddJob></PrivateRoute>,

            },
            {
              path:'/myPostedJobs',
              element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>,

            },
      

        //  login form routes
        {
            path: 'register',
            element: <Register></Register>
            
        },
        {
          path: 'signIn',
          element: <SignIn></SignIn>
        }
      ]
    },
  ]);

  export default  router;