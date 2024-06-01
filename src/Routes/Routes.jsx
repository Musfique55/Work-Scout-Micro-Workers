import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home";
import Login from "../Components/Login";
import Registration from "../Components/Registration";

export const router = createBrowserRouter([
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
    {
        path : '/login',
        element : <Login></Login>
    },
    {
        path : '/register',
        element : <Registration></Registration>
    }
])