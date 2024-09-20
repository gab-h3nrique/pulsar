"use client"

import { UserProvider } from '@/contexts/UserContext'
import React, { memo, useEffect, useState } from 'react'
import Button from '@/components/elements/Button'
import { Subtitle, Title } from '@/components/texts/Texts'
import { useRouter } from 'next/navigation'

const Page = () => {

    const router = useRouter()
  
    useEffect(()=> {

        router.push('/auth/pools')
    
    },[])
    

    return (

        <div className='p-4 gap-4 w-full h-full flex flex-col'>

            <Subtitle className='font-semibold'>Home</Subtitle>

            <section className='flex gap-2'>

                <div className="border bg-background-2 flex flex-col p-4 gap-2 w-80 rounded-2xl">

                    <h1 className="subtitle text-color-1"><b className='text-primary mr-3'>45</b>Novos atendimentos</h1>

                    <p className="description text-color-1">Clique para inic</p>
                    <span className="label text-color-1 w-fit bg-background-1 rounded-lg px-1 py-2">any-link-click-here.com.br</span>

                    <Button onClick={()=> console.log('hehehe')} className="ml-auto">
                        <span>do something</span>
                    </Button>

                </div>



            </section>

        </div>
        
    )


}

export default memo(Page)