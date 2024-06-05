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

    // admin route
    {
        path : '/dashboard',
        element : <DashboardLayout></DashboardLayout>,
        children : [
            {
                path : 'manager-home',
                element : <ManagerDashboard></ManagerDashboard>
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
            },
            
            //worker routes
            {
                path : 'worker-home',
                element : <WorkerDashboard></WorkerDashboard>,
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
                element : <Withdrawals></Withdrawals>
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