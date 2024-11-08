import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../Hooks/useAuth";
import { Player } from "@lottiefiles/react-lottie-player";
import useWorker from "../Hooks/useWorker";
const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const [isWorker,isFetching] = useWorker();
    const location = useLocation();
    const loader =
    <Player
    autoplay
    loop
    src="https://lottie.host/47e12094-cada-45be-b9f0-47a35c570531/Xz6EddocLm.json"
    style={{ height: '300px', width: '300px', marginLeft : 'auto',marginRight : 'auto'}}
    >
    </Player>
    if(loading || isFetching){
        return loader;
    }

    if(user && isWorker){
        return children;
    }
    return <Navigate to='/forbidden' state={location.pathname}></Navigate>
};

PrivateRoute.propTypes = {
    children : PropTypes.node
}
export default PrivateRoute;