import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

import { Inter } from 'next/font/google'
import app from '../firebase';



export default function Home() {
  return (
    <>
      <Head>
        <title>InvitApp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/eventos">Login</Link>
      </main>
    </>
  )
}
