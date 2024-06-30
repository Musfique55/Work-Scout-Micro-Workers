import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [clientSecret,setClientSecret] = useState(""); 
    const amount = parseInt(localStorage.getItem('cart'));
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.post('/create-payment-intent',{price : amount})
        .then(res => {
            setClientSecret(res.data.clientSecret)
        })
    },[axiosSecure,amount])

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!stripe || !elements) {
          return;
        }
    
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }

        // eslint-disable-next-line no-unused-vars
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${error}`,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
        //   console.log('[PaymentMethod]', paymentMethod);
        }
        const {paymentIntent,error : cardError} = await stripe.confirmCardPayment(clientSecret ,{
                payment_method : {
                    card : card,
                    billing_details : {
                        name : user.displayName,
                        email : user.email
                    }
                }
            })
            if(cardError){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${cardError.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/purchase')
            }else{
                const paymentInfo = {
                    email : user.email,
                    name : user.displayName,
                    id : paymentIntent.id,
                    amount : paymentIntent.amount / 100,
                    coins : parseInt(localStorage.getItem('coins')),
                    time :  new Date().toDateString(),
                    status : 'success'
                }
                if(paymentIntent.status === "succeeded"){
                    axiosSecure.post('/payments',paymentInfo)
                    .then(res => {
                        if(res.data.insertedId){
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Payment Completed Successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/dashboard/manager-home');
                        }
                    })
                }
            }
      };

    
    return (
        <form onSubmit={handleSubmit}>
            <h3 className="mb-10 text-2xl font-semibold">Amount :{amount}$</h3>
            <CardElement className="border-2 py-2"
                options={{
                style: {
                    base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    },
                    invalid: {
                    color: '#9e2146',
                    },
                },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret} className="font-semibold px-7 py-2 rounded-lg mt-5 bg-[#E5D5FA] text-[#8849DA] cursor-pointer">
                Pay
            </button>
    </form>
    );
};

export default Checkout;