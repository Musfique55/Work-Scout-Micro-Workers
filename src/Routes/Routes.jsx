import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home";
import Login from "../Components/Login";
import Registration from "../Components/Registration";
import DashboardLayout from "../Layouts/DashboardLayout";
import Addtask from "../Pages/Addtask";
import MyTasks from "../Pages/MyTasks";
import Update from "../Pages/Update";
import Tasklist from "../Pages/Tasklist";
import PrivateRoute from "./PrivateRoute";
import Details from "../Pages/Details";
import Submissions from "../Pages/Submissions";
import WorkerDashboard from "../Pages/WorkerDashboard";
import ManagerDashboard from "../Pages/ManagerDashboard";
import ErrorPage from "../Pages/ErrorPage";
import ForbiddenAccess from "../Pages/ForbiddenAccess";
import Withdrawals from "../Pages/Withdrawals";
import AdminHome from "../Pages/AdminHome";
import ManageUsers from "../Pages/ManageUsers";
import ManageTasks from "../Pages/ManageTasks";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";

export const router = createBrowserRouter([
    // public route
    {
        path : '/',
        element : <Layout></Layout>,
        errorElement : <ErrorPage></ErrorPage>,
        children : [
        {
            path : '/',
            element : <Home></Home>
        }
    ]
    },
    {
        path : '/dashboard',
        element : <DashboardLayout></DashboardLayout>,
        children : [
            // admin route
            {
                path : 'admin-home',
                element : <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path : 'manage-users',
                element : <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path : 'manage-tasks',
                element : <AdminRoute><ManageTasks></ManageTasks></AdminRoute>
            },

            // task creator route
            {
                path : 'manager-home',
                element : <ManagerRoute><ManagerDashboard></ManagerDashboard></ManagerRoute>
            },
            {
                path : 'add-tasks',
                element : <ManagerRoute><Addtask></Addtask></ManagerRoute>
            },
            {
                path : 'my-tasks',
                element : <ManagerRoute><MyTasks></MyTasks></ManagerRoute>
            },
            {
                path : 'my-tasks/update/:id',
                element : <ManagerRoute><Update></Update></ManagerRoute>,
                loader : ({params}) => fetch(`http://localhost:2000/alltasks/${params.id}`)
            },
            
            //worker routes
            {
                path : 'worker-home',
                element : <PrivateRoute><WorkerDashboard></WorkerDashboard></PrivateRoute>,
            },
            {
                path : 'task-list',
                element : <PrivateRoute><Tasklist></Tasklist></PrivateRoute>
            },
            {
                path : 'task-list/details/:id',
                element : <PrivateRoute><Details></Details></PrivateRoute>,
                loader : ({params}) => fetch(`http://localhost:2000/alltasks/${params.id}`)
            },
            {
                path : 'my-submissions',
                element : <PrivateRoute><Submissions></Submissions></PrivateRoute>
            },
            {
                path :'withdrawals',
                element : <PrivateRoute><Withdrawals></Withdrawals></PrivateRoute>
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
    },
    {
        path : '/forbidden',
        element : <ForbiddenAccess></ForbiddenAccess>
    }
])