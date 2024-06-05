import { Player } from "@lottiefiles/react-lottie-player";


const ForbiddenAccess = () => {
    return (
        <div>
            <Player  autoplay
                loop
                src="https://lottie.host/9d5f5c3c-1a11-4970-a783-f22aa5283009/q2YAUKdcr0.json"
                style={{ height: '300px', width: '300px', marginLeft : 'auto',marginRight : 'auto'}}
            ></Player>
            <h3 className="text-3xl font-semibold text-center">You do not have access in this</h3>
        </div>
    );
};

export default ForbiddenAccess;