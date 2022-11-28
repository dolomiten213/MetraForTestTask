import '../common/styles.css'
import React from "react";

import {Button} from "../common/Button";
import {Input} from "../common/Input"
import {Header} from "../common/Header";
import {useAuth} from "../../hooks/useAuth";

export function SignUpFrom(props: any) 
{
    
    const {
        login, setLogin, 
        password, setPassword, 
        password2, setPassword2,
        signUp, isBadPassword, token
    } = useAuth()
    
    async function checkStatus()
    {
        localStorage.clear()
        await signUp()
        let token = localStorage.getItem('token')
        console.log(token)
        props.setIsLogged(token)
    }
    
    return(
        <div id="loginform">
            
            <Header title="Sign up" />
            
            <Input description="Username"
                   placeholder="Enter your username"
                   type="text"
                   isGoodPassword={true}
                   value={login}
                   onChange={setLogin}
            />

            <Input description="Password"
                   placeholder="Enter your password"
                   type="password"
                   isGoodPassword={true}
                   value={password}
                   onChange={setPassword}
            />

            <Input description="Password again"
                   placeholder="Re-enter the password"
                   type="password"
                   isBad={isBadPassword()}
                   value={password2}
                   onChange={setPassword2}
            />

            <Button
                title="Sign up"
                isDisabled={false}
                onClick={checkStatus}
            />
            
        </div>
    )
}

