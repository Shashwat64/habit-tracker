"use client";

import TopNavSignInUp from "@/src/Components/TopNavSignInUp"
import Link from "next/link";

import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage(){

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/home/dashboard");
    }
  }, [session]);

  const [isError, setIsError] = useState(false)
  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log(result);

    if (result?.ok) {
      router.push("/home/dashboard");  // ← redirect here
    } else {
      setIsError(true);
    }
  }

  return (
    <>
      <TopNavSignInUp/>
      <main className="pt-16 text-primary flex flex-col justify-center items-center bg-background h-full">
        <section className="w-100">
          <h1 className="mb-2 text-2xl">Welcome Back to Focura</h1>
          <h2 className="text-secondary mb-10">Sign in to continue where you left off</h2>

          <p className={`bg-red-950/50 border border-red-900 text-red-300 text-center p-2 mb-5 rounded-md ${isError ? "" : "invisible"}`}>
            Invalid Email or Password.
          </p>

          <form onSubmit={handleSubmit}>
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

            <button className="block mb-5 py-2 bg-card text-surface w-full self-center rounded-lg  hover:bg-card-hover active:bg-card-active active:scale-98 transition-all duration-75">Sign in</button>

          </form>
          <p className='text-center'>Don't have an account?<Link href="/signup" className='text-secondary cursor-pointer ml-2'>Sign Up</Link> </p>
          <p className="text-secondary cursor-pointer text-center">Forget Password</p>
        </section>
      </main>
      </>
    )
  }