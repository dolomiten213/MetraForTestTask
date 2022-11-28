import axios from "axios";
import {ITokenDto} from "../domain/TokenDto";
import {useState} from "react";

export function useAuth()
{
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const [token, setToken] = useState<string>('')
    
    async function signUp(){
        if (password !== password2) {
            alert("passwords are not the same")
            return
        }
        try {
            const res = await axios.post<ITokenDto>("http://localhost/api/auth/sign-up", { username: login, password: password})
            console.log(res)
            localStorage.setItem('token', res.data.token)
            setToken(res.data.token)
        }
        catch{
            alert('server is offline')
        } 
            
    }

    const isBadPassword = () => password !== password2;
    
    return {
        login, setLogin, 
        password, setPassword, 
        password2, setPassword2,
        signUp,
        isBadPassword, token
    }
}