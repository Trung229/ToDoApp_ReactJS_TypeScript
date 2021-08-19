import React, { createContext, useState, ReactNode, useEffect } from "react";
import {CheckEmail} from './helper/checkEmail'
import {CheckPassword} from './helper/checkPassword'

interface UserDefaultProps {
    children: ReactNode
}

interface UserContextDefaults {
    email:string,
    password:string,
    errorEmail:{
        isValid:boolean,
        message: string,
    },
    errorPassword:{
        isValid:boolean,
        message: string,
    },
    userInfo:{
        name:string | undefined,
        picture:string | undefined,
    },
    isLogin:boolean,
    onSignIn:()=>void,
    onChangeEmail:(email: string) => void,
    onChangePassword:(password: string) => void,
    onChangeName:(name:string | undefined) => void,
    onChangePicture:(picture: string | undefined) => void,
}

const myUser ={
    email:"",
    password:"",
    errorEmail:{
        isValid:false, message: ""
    },
    errorPassword:{
        isValid:false, message: ""
    },
    userInfo:{
        name:"",
        picture:"",
    },
    isLogin:false,
    onSignIn:()=>{},
    onChangeEmail:()=>{},
    onChangePassword:()=>{},
    onChangeName:()=>{},
    onChangePicture:()=>{}
}

export const UserContext = createContext<UserContextDefaults>(myUser);

const UserContextProvider = ({children}:UserDefaultProps) => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState(myUser.errorEmail)
    const [errorPassword, setErrorPassword] = useState(myUser.errorPassword)
    const [stateLogin, setStateLogin] = useState(myUser.isLogin);
    const [userName, setUserName] = useState(myUser.userInfo.name || undefined);
    const [userPicture, setUserPicture] = useState(myUser.userInfo.picture || undefined);
    function onSignIn () {
        if(!CheckEmail(email).isValid || !CheckPassword(password).isValid){
            setErrorEmail(CheckEmail(email));
            setErrorPassword(CheckPassword(password));
        }else{
            setStateLogin(true);
            setErrorEmail(CheckEmail(email));
            setErrorPassword(CheckPassword(password));
        }
    }
    
    function onChangeEmail (email:string){
        setEmail(email);
    }
    
    function onChangePassword (password:string){
        setPassword(password);
    }
    function onChangeName(name:string | undefined){
        setUserName(name);
    }
    function onChangePicture(picture:string | undefined){
        setUserPicture(picture);
    }
    
    const UserDynamicData = {
        email:email,
        password:password,
        errorEmail:errorEmail,
        errorPassword:errorPassword,
        isLogin:stateLogin,
        userInfo:{name:userName, picture:userPicture},
        onSignIn,
        onChangeEmail,
        onChangePassword,
        onChangeName,
        onChangePicture,
    }
    return (
        <UserContext.Provider value={UserDynamicData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
