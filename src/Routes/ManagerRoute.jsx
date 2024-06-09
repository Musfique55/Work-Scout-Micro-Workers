import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../Hooks/useAuth";
import useManager from "../Hooks/useManager";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
const ManagerRoute = ({children}) => {
    const [isTaskCreator,isLoading] = useManager();
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

    if(loading || isLoading){
        return loader;
    }
    if(user && isTaskCreator){
        return children;
    }
    return <Navigate to="/forbidden" state={location.pathname}></Navigate>
};

ManagerRoute.propTypes = {
    children : PropTypes.node
}
export default ManagerRoute;