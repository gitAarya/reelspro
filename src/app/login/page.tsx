"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

function LoginPage() {  

    const [email,setEmail]= useState("");
    const [password,SetPassword]= useState("");
    const router= useRouter();
    const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
          const result=  await signIn("credentials",{
                email,
                password,
                redirect: false
            })
            if(result?.error){
                console.log(result.error);
                
            }else {
                router.push("/")
            }
           
        } catch (error) {
            console.log("error in login", error);
            return alert("Login failed");
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <button type="submit">Login</button>
            </form>
            <div>
                <p>don't have a accont <a href="/register">register</a></p>
            </div>
        </div>
    );
}

export default LoginPage