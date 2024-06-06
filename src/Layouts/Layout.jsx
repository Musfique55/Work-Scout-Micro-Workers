import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import { useState,useEffect } from "react";
import useUserInfo from "../Hooks/useUserInfo";
import { Player } from "@lottiefiles/react-lottie-player";
import Footer from "../Components/Footer";

const Layout = () => {
    const {userInfo} = useUserInfo();
    const [findUser,setFindUser] = useState(true);
    const loader =
    <Player
    autoplay
    loop
    src="https://lottie.host/47e12094-cada-45be-b9f0-47a35c570531/Xz6EddocLm.json"
    style={{ height: '300px', width: '300px', marginLeft : 'auto',marginRight : 'auto'}}
    >
    </Player>
    
    useEffect(() => {
        if(userInfo){
            setFindUser(false);
        }else{
            setFindUser(true);
        }
    },[userInfo])

    if(findUser){
        return loader;
    }
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;