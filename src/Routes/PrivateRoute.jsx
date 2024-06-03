import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../Hooks/useAuth";
import loader from '../assets/Animation - 1717415326262.gif';
const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();
    if(loading){
        return loader;
    }

    if(user){
        return children;
    }
    return <Navigate to='/' state={location.pathname}></Navigate>
};

PrivateRoute.propTypes = {
    children : PropTypes.node
}
export default PrivateRoute;