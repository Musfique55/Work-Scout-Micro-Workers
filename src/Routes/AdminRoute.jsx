import { Player } from "@lottiefiles/react-lottie-player";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
const AdminRoute = ({children}) => {
    const [isAdmin,isPending] = useAdmin();
    const {user,loading} = useAuth();
    const location = useLocation();
    const loader =
    <Player
    autoplay
    loop
    src="https://lottie.host/47e12094-cada-45be-b9f0-47a35c570531/Xz6EddocLm.json"
    style={{ height: '300px', width: '300px', marginLeft : 'auto',marginRight : 'auto'}}
    >
    </Player>

    if(loading && isPending){
        return loader;
    }

    if(user && isAdmin){
        return children;
    }
    
    <Navigate to="/forbidden" state={location.pathname}></Navigate>
};

AdminRoute.propTypes = {
    children : PropTypes.node
}
export default AdminRoute;