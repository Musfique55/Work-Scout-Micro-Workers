import reg from '../assets/isometric-feedback-concept-illustrated_23-2148940193.jpg';
import google from '../assets/google.png';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
const Registration = () => {
    const {createUser,googleLogin} = useAuth();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
          const email = data.email;
          const name = data.name;
          const photo = data.photoUrl[0];
          const password = data.password;
          const role = data.role;
          console.log(email,name,photo,password,role);
          createUser(email,password)
          .then(res => {
            console.log(res);
          })
      }

      const handleGoogle = () => {
        googleLogin()
        .then(res => {
            console.log(res);
            if(res.user){
                axiosPublic.post('/users',)
            }
        })
      }
    return (
        <div className="flex flex-row-reverse m-12 gap-10">
            <div className='flex flex-1'>
                <img src={reg} alt="" />
            </div>
            <div>
                <h3 className='mb-10 text-3xl font-medium'>Create Account</h3>
                <div className='flex gap-6'>
                <button onClick={handleGoogle} className='flex border-2 items-center gap-4 p-2'><img src={google} alt="" className='h-6 w-6'/> Countinue With Google</button>
                <button className='flex border-2 items-center gap-4 p-2'><img src={google} alt="" className='h-6 w-6'/> Countinue With Google</button>
                </div>
                <div className='flex mt-5 flex-1 items-center'>
                    <hr className='border w-full mr-2'/>
                        OR 
                    <hr className='border w-full ml-2'/>
                </div>
                <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label htmlFor='fullname'>
                            Full Name
                        </label>
                        <input name='fullname' placeholder='Full Name' {...register("name")} className='mt-2 border-2 p-2 focus:outline-none'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='email'>
                            Email
                        </label>
                        <input name='email' placeholder='Email' type='email' {...register("email")} className='border-2 mt-2 p-2 focus:outline-none'/>
                    </div>
                    <div className='flex flex-col w-fit'>
                        <label>
                            Upload Image
                        </label>
                        <input name='photo' type='file'  {...register("photoUrl")} className='border-2  mt-2 focus:outline-none'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='fullname'>
                            Password
                        </label>
                        <input name='password' type='password' placeholder='Password' {...register("password")} className='border-2 p-2 mt-2 focus:outline-none'/>
                    </div>
                    <div className='border-2 w-fit px-4 py-2'>
                        <select {...register('role')} defaultValue={"select a role"} className='dropdown'>
                            <option disabled value="select a role">Select a Role</option>
                            <option value="worker">Worker</option>
                            <option value="taskCreator">Task Creator</option>
                        </select>
                    </div>
                    <button type="submit" className='w-full py-2 bg-[#8849da] text-white'>Sign Up</button>
                </form>
                <p className='mt-2'>Already Have an Account? <Link to='/login' className='text-blue-500 '>Login</Link></p>
            </div>
        </div>
    );
};

export default Registration;