"use client"
import axios from "axios";
import { useRef } from "react"

export default function SignIn(){
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    async function signUserIn(){
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post('http://localhost:3002/user/signin',{
            email,
            password
        });
        localStorage.setItem('token', response.data.token)
        console.log(response);
    };
    return (
        <div className = {'w-screen h-screen flex items-center justify-center flex-col'}>
            <input ref = {emailRef} placeholder = "email"></input>
            <input ref = {passwordRef} placeholder = "password"></input>
            <button onClick = {()=>signUserIn()} >Sign in</button>
        </div>
    )
}