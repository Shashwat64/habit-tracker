"use client";

import TopNavSignInUp from "@/src/Components/TopNavSignInUp";
import Link from "next/link";

import { useState } from "react";


export default function SignUpPage(){

  let [isError, setIsError] = useState<boolean>(false);
  
  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const result = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const res = await result.json();

    console.log(res);

    if(res?.error){
      setIsError(true);
    }
  }
  
  return (
    <>
      <TopNavSignInUp/>
      <main className="pt-16 text-primary flex flex-col justify-center items-center bg-background h-full">
        <section className="w-100">
          <div>
            <h2 className='font-semibold text-2xl mb-2'>Create your account</h2>
            <p className='text-sm font-light mb-5'>Start tracking your job applications today!</p>
          </div>

          <p className={`bg-red-950/50 border border-red-900 text-red-300 text-center p-2 mb-5 rounded-md ${isError ? "" : "invisible"}`}>
            Username or Email already used.
          </p>

          <form onSubmit={handleSubmit}>
            <div className='w-full flex gap-2 min-w-0'>
              <label className='flex-1 flex flex-col'>
                First Name
                <input className='p-2 mt-1 mb-5 border border-border rounded-lg' 
                  type="text" 
                  placeholder='Enter your first name' 
                  name="firstName"
                  required
                />
              </label>

              <label className='flex-1 flex flex-col min-w-0'>
                Last Name
                <input className='p-2 mt-1 mb-5 border border-border rounded-lg' type="text" placeholder='Enter your last name'  name="lastName" required/>
              </label>

            </div>

            <label className='w-full flex flex-col'>
              Username
              <input className='p-2 mt-1 mb-5 border border-border rounded-lg' type="text" placeholder='Enter your username'  name="username" required/>
              
            </label>

            <label className='w-full flex flex-col'>
              Email Address
              <input className='p-2 mt-1 mb-5 border border-border rounded-lg' type="email" placeholder='Enter your email'  name="email" required/>
            </label>

            <label className='w-full flex flex-col'>
              Password
              <input className='p-2 mt-1 mb-5 border border-border rounded-lg' type="password" placeholder='Enter your password'   name="password" required/>
            </label>

            <button className="block mb-5 py-2 bg-card text-surface w-full self-center rounded-lg  hover:bg-card-hover active:bg-card-active active:scale-98 transition-all duration-75">Sign Up</button>

            <p className='text-center'>Already have an account?<Link href="/signin" className='text-brand cursor-pointer ml-2'>Sign In</Link> </p>
          </form>
        </section>
      </main>
    
    </>
  )
}