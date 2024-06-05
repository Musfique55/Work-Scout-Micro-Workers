import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
            <Player  autoplay
                loop
                src="https://lottie.host/8375b542-7be8-419a-84d1-d171a5b5ae4d/VhRkEWDeEE.json"
                style={{ height: '300px', width: '300px', marginLeft : 'auto',marginRight : 'auto'}}
            ></Player>

            <h2 className="text-8xl text-black font-bold text-center">We Lost This Page</h2>
            <p className="text-center mt-8 text-gray-600 font-2xl">The Page You are Searching does not exist or maybe moved</p>
            <Link to='/' className="flex justify-center mt-20"><button className="px-7 bg-black py-3 rounded-xl text-white">Back to Home</button></Link>
        </div>
    );
};

export default ErrorPage;