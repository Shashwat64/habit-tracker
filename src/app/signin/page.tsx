"use client";

import TopNavSignInUp from "@/src/Components/TopNavSignInUp"
import Link from "next/link";

export default function LoginPage(){
  return (
    <>
      <TopNavSignInUp/>
      <main className="pt-16 text-primary flex flex-col justify-center items-center bg-background h-full">
        <section className="w-100">
          <h1 className="mb-2 text-2xl">Welcome Back to Focura</h1>
          <h2 className="text-secondary mb-10">Sign in to continue where you left off</h2>

          <form action="">
            <label className='w-full flex flex-col'>
              Email Address
              <input 
                className='p-2 mt-1 mb-5 border border-border rounded-lg' 
                type="text" 
                placeholder='Enter your email'
                name="email" 
              />
            </label>

            <label className='w-full flex flex-col'>
              Password
              <input 
                className='p-2 mt-1 mb-5 border border-border rounded-lg' 
                type="password" 
                placeholder='Enter your password'
                name="password"
              />
            </label>

            <button className='block mb-5 py-2 bg-card text-surface w-full self-center rounded-lg'>Sign in</button>
          </form>
          <p className='text-center'>Don't have an account?<Link href="/signup" className='text-secondary cursor-pointer ml-2'>Sign Up</Link> </p>
          <p className="text-secondary cursor-pointer text-center">Forget Password</p>
        </section>
      </main>
      </>
    )
  }