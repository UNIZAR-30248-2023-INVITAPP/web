import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';


import { Inter } from 'next/font/google'
import Login from '@/components/login.js';
import Signup from '@/components/signup';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '@/firebase';



export default function Home() {
  const user = auth.currentUser;
  console.log(user);
  const router = useRouter();
  if(user){
    router.push("/eventos");
  }
  else{
    return(
      <Login></Login>
    )
  }
}
