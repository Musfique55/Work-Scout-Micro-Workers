import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types';
const ProtectedRoute = ({children}) => {
    const {user,loading} = useAuth();
    const loader =
    <Player
    autoplay
    loop
    src="https://lottie.host/47e12094-cada-45be-b9f0-47a35c570531/Xz6EddocLm.json"
    style={{ height: '300px', width: '300px', marginLeft : 'auto',marginRight : 'auto'}}
    >
    </Player>

    if(loading){
        return loader;
    }
    if(user){
        return children;
    }
};

ProtectedRoute.propTypes = {
    children : PropTypes.node
}
export default ProtectedRoute;