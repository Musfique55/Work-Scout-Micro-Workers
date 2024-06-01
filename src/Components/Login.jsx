import reg from '../assets/isometric-feedback-concept-illustrated_23-2148940193.jpg';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import { Link } from 'react-router-dom';
const Login = () => {
    const {login} = useAuth();
    const {
        register,
        handleSubmit,
      } = useForm()

      const onSubmit = (data) => {
          const email = data.email;
          const password = data.password;
          login(email,password)
          .then(res => {
            console.log(res);
          })
      }
    return (
        <div className="flex  m-12 gap-10">
            <div className='flex flex-1'>
                <img src={reg} alt="" className='h-[400px] w-full object-cover'/>
            </div>
            <div className='flex-1'>
                <h3 className='mb-3 text-3xl font-medium'>Welcome Back</h3>
                <div className='flex mb-5  items-center'>
                  <p>Enter email and password for login</p>
                </div>
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