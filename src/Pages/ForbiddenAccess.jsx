import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";


const ForbiddenAccess = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Player  autoplay
                loop
                src="https://lottie.host/9d5f5c3c-1a11-4970-a783-f22aa5283009/q2YAUKdcr0.json"
                style={{ height: '300px', width: '300px', marginLeft : 'auto',marginRight : 'auto'}}
            ></Player>
            <h3 className="text-3xl font-semibold text-center">You do not have access in this</h3>
            <Link to="/"><button className="btn mt-5">Go Back Home</button></Link>
        </div>
    );
};

export default ForbiddenAccess;