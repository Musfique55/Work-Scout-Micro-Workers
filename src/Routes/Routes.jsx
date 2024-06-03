import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home";
import Login from "../Components/Login";
import Registration from "../Components/Registration";
import Dashboard from "../Pages/Dashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManagerHome from "../Layouts/ManagerHome";
import Addtask from "../Pages/Addtask";
import MyTasks from "../Pages/MyTasks";
import Update from "../Pages/Update";

export const router = createBrowserRouter([
    // public route
    {
        path : '/',
        element : <Layout></Layout>,
        children : [
        {
            path : '/',
            element : <Home></Home>
        }
    ]
    },

    // admin route
    {
        path : '/dashboard',
        element : <DashboardLayout></DashboardLayout>,
        children : [
            {
                index : true,
                element : <Dashboard></Dashboard>
            },
            // manager routes
            {
                path : 'manager-home',
                element : <ManagerHome></ManagerHome>
            },
            {
                path : 'add-tasks',
                element : <Addtask></Addtask>
            },
            {
                path : 'my-tasks',
                element : <MyTasks></MyTasks>
            },
            {
                path : 'my-tasks/update/:id',
                element : <Update></Update>,
                loader : ({params}) => fetch(`http://localhost:2000/alltasks/${params.id}`)
            }
        ]
    },
    {
        path : '/login',
        element : <Login></Login>
    },
    {
        path : '/register',
        element : <Registration></Registration>
    }
])