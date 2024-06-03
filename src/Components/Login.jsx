import reg from '../assets/isometric-feedback-concept-illustrated_23-2148940193.jpg';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import google from '../assets/google.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Login = () => {
    const {login,googleLogin} = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
      } = useForm()

      const onSubmit = (data) => {
          const email = data.email;
          const password = data.password;
          login(email,password)
          .then(res => {
            if(res.user){
                navigate('/');  
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have logged in  successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
          })
          .catch(error => {
            const msg = error.message;
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${msg}`,
                showConfirmButton: false,
                timer: 1500
              });
          })
      }

      const handleGoogle = () => {
        googleLogin()
        .then((res) => {
            navigate('/');
            if(res.user){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have logged in  successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
        .catch(error => {
            const msg = error.message;
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${msg}`,
                showConfirmButton: false,
                timer: 1500
              });
        })
      }
    return (
        <div className="flex  m-12 gap-10">
            <div className='flex flex-1'>
                <img src={reg} alt="" className='h-[450px] w-full object-cover'/>
            </div>
            <div className='flex-1'>
                <h3 className='mb-3 text-3xl font-medium'>Welcome Back</h3>
                <div className='flex mb-5  items-center'>
                  <p>Enter email and password for login</p>
                </div>
                <button onClick={handleGoogle} className='flex border-2 items-center gap-4 p-2'><img src={google} alt="" className='h-6 w-6'/> Continue With Google</button>
                <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label htmlFor='email'>
                            Email
                        </label>
                        <input name='email' placeholder='Email' type='email' {...register("email")} className='border-2 mt-2 p-2 focus:outline-none'/>
                    </div>
                    
                    <div className='flex flex-col'>
                        <label htmlFor='password'>
                            Password
                        </label>
                        <input name='password' type='password' placeholder='Password' {...register("password")} className='border-2 p-2 mt-2 focus:outline-none'/>
                    </div>
                    
                    <button type="submit" className='w-full py-2 bg-[#8849da] text-white'>Sign Up</button>
                </form>
                <p className='mt-3'>Do not have an account? <Link to='/register' className='text-blue-500'>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;