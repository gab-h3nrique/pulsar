'use client'

import './globals.css'

import { useRouter } from "next/navigation";

export default function Home() {

  console.log('ehehehe')

  const router = useRouter()

  router.push('/auth')

  return null

}
