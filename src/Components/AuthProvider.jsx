import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../../firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
export const AuthContext = createContext(null); 

const AuthProvider = ({children}) => {
    const gAuth = new GoogleAuthProvider();
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const axiosPublic = useAxiosPublic();
    
    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const update = (name,url) => {
        setLoading(true);
         return updateProfile(auth.currentUser,{
            displayName : name,
            photoURL : url
        });
    }

    const login = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth,gAuth);
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser);
            const email = currentUser?.email;
            if(currentUser){
                setLoading(false);
                axiosPublic.post('/jwt',{email})
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })
            }else{
                setLoading(false);
                localStorage.removeItem('access-token');
            }
        })
        return () => {
            unSubscribe();
        }
    },[axiosPublic])

    const authInfo = {createUser,googleLogin,logout,login,update,user,loading}
    return(

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

AuthProvider.propTypes = {
    children : PropTypes.node
}
export default AuthProvider;