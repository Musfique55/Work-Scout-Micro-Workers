import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "../Components/Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Purchase = () => {
    return (
        <div className="m-12">
            <Elements stripe={stripePromise}>
                <Checkout></Checkout>
            </Elements>
        </div>
    );
};

export default Purchase;