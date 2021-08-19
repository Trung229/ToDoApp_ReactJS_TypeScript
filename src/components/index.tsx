import React,{useEffect, useContext} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {UserContext} from '../contexts/userContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useParams,
} from "react-router-dom";

//interface facebook Login
export interface ReactFacebookLoginInfo {
    id: string;
    userID: string;
    accessToken: string;
    name?: string | undefined;
    email?: string | undefined;
    picture?: {
        data: {
          height?: number | undefined,
          is_silhouette?: boolean | undefined,
          url?: string | undefined,
          width?: number | undefined,
      },
    } | undefined;
}
//end interface Facebook
//Interface google-login

  
  
//end interface google-login.
export const Index = () => {
    const {errorPassword,
           errorEmail,
           isLogin,
           onSignIn,
           onChangeEmail,
           onChangePassword,
           onChangeName,
           onChangePicture,
        } = useContext(UserContext);
    let history = useHistory();
    const responseFacebook = (response:ReactFacebookLoginInfo) => {
        onChangeName(response.name)
        onChangePicture(response.picture?.data.url);
        history.push("/main");
    }

    const responseGoogle = (response:any) => {
        onChangeName(response.profileObj.email)
        onChangePicture(response.profileObj.imageUrl);
        history.push("/main");
    }
    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label >Email address:</label>
                    <input onChange={(e)=>{onChangeEmail(e.target.value)}} type="email" className="form-control" placeholder="Enter email" id="email" />
                    <small id="emailHelp" className="form-text text-danger">{errorEmail.isValid ? errorEmail.message :errorEmail.message}</small> 
                </div>
                <div className="form-group">
                    <label >Password:</label>
                    <input onChange={(e)=>{onChangePassword(e.target.value)}} type="password" className="form-control" placeholder="Enter password" id="pwd" />
                    <small id="passwordHelp" className="form-text text-danger">{errorPassword.isValid ? errorPassword.message :errorPassword.message}</small>
                </div>
                <div className="form-group form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" /> Remember me
                    </label>
                </div>
                <br />
                <Link to={isLogin?history.push('/main'):'/'} onClick={()=>{onSignIn()}} type="button" className="btn btn-primary mb-4">Submit</Link>
                <br />
                <FacebookLogin
                    appId="1525780704449122" //APP ID NOT CREATED YET
                    fields="name,email,picture"
                    callback={responseFacebook}
                />
                <br />
                <br />
                <GoogleLogin
                    clientId="608804192447-r8dtn33t3a3hjs2ijddif8biqaog83mq.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />

            </form>
        </div>
    )
}