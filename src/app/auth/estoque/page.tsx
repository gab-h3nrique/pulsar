'use client'

import Button from '@/components/elements/Button'
import Svg from '@/components/icons/Svg'
import { Description, Subtitle } from '@/components/texts/Texts'
import { useRouter } from 'next/navigation'
import React, { memo } from 'react'

function Page() {

  const router = useRouter()

  return (

    <div className=' gap-1 w-full h-full flex flex-col'>

      <Subtitle className='font-semibold'>Estoque</Subtitle>

      <Description onClick={router.back} className='flex gap-1 cursor-pointer'>
        <Svg.Angle className='w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]'/>
        voltar
      </Description>

      <section className='mt-3 flex gap-4'>

        <div className=" border bg-background-2 flex flex-col p-4 gap-2 w-80 rounded-2xl">

          <Subtitle className="">Produtos / Serviços</Subtitle>

          <p className="description text-color-1">Gerencie seu estoque de produtos</p>

          <Button onClick={() => router.push('/auth/estoque/produtos')} className='mt-3 ml-auto text-color-2'>Acessar</Button>

        </div>

        <div className=" border bg-background-2 flex flex-col p-4 gap-2 w-80 rounded-2xl">

          <Subtitle className="">Marcas</Subtitle>

          <p className="description text-color-1">Adicione uma marca para os produtos</p>

          <Button onClick={() => router.push('/auth/estoque/marcas')} className='mt-3 ml-auto text-color-2'>Acessar</Button>

        </div>

      </section>

    </div>

  )
}

export default memo(Page)