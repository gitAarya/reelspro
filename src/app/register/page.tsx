"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// todo
// react qurery
// loading error debounce
// 

function RegisterPage(){
    const [email, setEmail] = useState("");
    const [password,SetPassword]= useState("");
    const [cofirmPassword,SetConfirmPassword]= useState("");
    const router=useRouter();

    const handleSubmit= async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password !== cofirmPassword){
            return alert("password not matched")
        }

        try {
           const response = await fetch("/api/auth/register", {
             method: "POST",
             headers: {
               contentType: "application/json",
             },
             body: JSON.stringify({
               email,
               password,
             }),
           });

 
            if (response.ok) {
              throw new Error("Failed to register user");
            } 
           const data = await response.json();
            
            console.log("registration data", data);
            router.push("/login");
            alert("registration successful")
            
        } catch (error) {
            console.log("error in registration", error);
            return alert("registration failed")
            
        }

    }

        return (
          <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="cofirmPassword"
                value={cofirmPassword}
                onChange={(e) => SetConfirmPassword(e.target.value)}
              />
              <button type="submit">Register</button>
            </form>

            <div>
                <p>alredy have an account? <a href="/login">login</a></p>
            </div>
          </div>
        );
}

export default RegisterPage;