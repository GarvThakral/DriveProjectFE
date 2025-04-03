"use client"
import axios from "axios";
import { useRef } from "react"

export default function SignIn(){
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    async function signUserUp(){
        const email = emailRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        
        const response = await axios.post('http://localhost:3002/user/signup',{
            username,
            email,
            password
        });

        console.log(response);
    };
    return (
        <div className = {'w-screen h-screen flex items-center justify-center flex-col'}>
            <input ref = {usernameRef} placeholder = "username"></input>
            <input ref = {emailRef} placeholder = "email"></input>
            <input ref = {passwordRef} placeholder = "password"></input>
            <button onClick = {()=>signUserUp()} >Sign up</button>
        </div>
    )
}