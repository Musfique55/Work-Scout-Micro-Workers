import reg from '../assets/isometric-feedback-concept-illustrated_23-2148940193.jpg';
import google from '../assets/google.png';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const Registration = () => {
    const {createUser,googleLogin,update} = useAuth();
    const axiosPublic = useAxiosPublic();
    const imageHosting = import.meta.env.VITE_IMAGE_HOSTING;
    const hostingURL = `https://api.imgbb.com/1/upload?key=${imageHosting}`;
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = async(data) => {
          const email = data.email;
          const name = data.name;
          const imageFile = {image : data.photoUrl[0]};
          const password = data.password;
          const role = data.role;
          const res = await  axiosPublic.post(hostingURL,imageFile,{
            headers : {
                'content-type' : 'multipart/form-data',
            },
          })
          if(res.data.success){
            const image = res.data.data.display_url;
            const userInfo = {
                image : image,
                email,
                name,
                role,
                coins : data.role === 'worker' ? 10 : 50,
            }
            createUser(email,password)
            .then(res => {
                if(res.user){
                    update(name,image)
                    .then(() => {
                        axiosPublic.post('/users',userInfo)
                        .then(res => {
                            if(res.data.insertedId){
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "You have registered successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                  });
                            }
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
            })
          }
      }

      const handleGoogle = () => {
        googleLogin()
        .then(res => {
            if(res.user){
                const userInfo = {
                    image : res.user.photoURL,
                    email : res.user.email,
                    name : res.user.displayName,
                    role : 'worker',
                    coins : 10 
                }
                axiosPublic.post('/users',userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        if(res.data.insertedId){
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "You have registered successfully",
                                showConfirmButton: false,
                                timer: 1500
                              });
                        }
                    }
                })
            }
        })
      }
    return (
        <div className="flex flex-row-reverse m-12 gap-10">
            <div className='flex flex-1'>
                <img src={reg} alt="" className='w-full'/>
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
                <form className='space-y-3'onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label htmlFor='fullname'>
                            Full Name
                        </label>
                        <input name='fullname' placeholder='Full Name' {...register("name",{required : true})} className='mt-2 border-2 p-2 focus:outline-none'/>
                        {errors.name && <p className='text-red-500'>This feild must be fill</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='email'>
                            Email
                        </label>
                        <input name='email' placeholder='Email' type='email' {...register("email",{required:true})} className='border-2 mt-2 p-2 focus:outline-none'/>
                        {errors.email && <p className='text-red-500'>This field must be fill</p>}
                    </div>
                    <div className='flex flex-col w-fit'>
                        <label>
                            Upload Image
                        </label>
                        <input name='photo' type='file'  {...register("photoUrl")} className='border-2  mt-2 focus:outline-none'/>
                    </div>
                    <div className='flex flex-col'>
                        <label>
                            Password
                        </label>
                        <input name='password' type='password' placeholder='Password' {...register("password",{pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,required: true})} className='border-2 p-2 mt-2 focus:outline-none'/>
                        {errors.password && errors.password.type === "required" &&  
                        <p className='text-red-500'>This field must be fill</p>}
                        {errors.password && errors.password.type === "pattern" &&  
                        <p className='text-red-500'>Password Must be 8 characters and  password should have atleast one uppercase <br /> one lowercase and a special character</p>}
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