'use client'

import { useEffect } from 'react';
import './globals.css'

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  useEffect(()=> {

    router.push('/auth')
    
  },[])


  return null

}
