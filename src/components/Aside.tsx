'use client'

import React, { memo, useEffect, useState } from 'react'
import Button from './elements/Button'
import Svg from './icons/Svg'
import { Description, Label } from './texts/Texts'
import { version } from './../../package.json'
import Package from './Package'
import { useRouter } from 'next/navigation'

type Pages = '' | 'dashboard' | 'atendimentos' | 'estoque' | 'configuracoes'

function Aside() {

  const router = useRouter()

  const [ page,  setPage] = useState<Pages>('')

  async function push(page: Pages) {

    setPage(page)

    router.push(`/auth/${page}`)
    
  }


  useEffect(()=> {

    if (typeof window !== "undefined") {

      const routers = window.location.pathname.replace('/auth/', '') as Pages || '' as Pages

      setPage(routers)

    }


  }, [])

  return (

    <aside className='pt-16 pb-3 px-3 gap-8 h-full hidden flex-col md:flex relative border border-y-0 border-l-0 bg-background-2'>

      <section onClick={() => push('')} className='button relative gap-3 flex justify-start items-center cursor-pointer'>
        <Svg.House className={`w-6 h-6 ${ page == '' ? 'fill-primary' : 'fill-color-1'}`}/>
        <Description className={`mt-1 ${ page == '' ? 'text-primary' : ''}`}>Home</Description>
        <span className={`absolute -right-4 w-[.3rem] h-[160%] bg-primary rounded-lg ${page == '' ? '' : 'hidden'}`}></span>
      </section>

      <section onClick={() => push('dashboard')} className='button relative gap-3 flex justify-start items-center cursor-pointer'>
        <Svg.ChartLine className={`w-6 h-6 ${ page == 'dashboard' ? 'fill-primary' : 'fill-color-1'}`}/>
        <Description className={`mt-1 ${ page == 'dashboard' ? 'text-primary' : ''}`}>Dashboard</Description>
        <span className={`absolute -right-4 w-[.3rem] h-[160%] bg-primary rounded-lg ${page == 'dashboard' ? '' : 'hidden'}`}></span>
      </section>

      <section onClick={() => push('atendimentos')} className='button relative gap-3 flex justify-start items-center cursor-pointer'>
        <Svg.List className={`w-6 h-6 ${ page == 'atendimentos' ? 'fill-primary' : 'fill-color-1'}`}/>
        <Description className={`mt-1 ${ page == 'atendimentos' ? 'text-primary' : ''}`}>Atendimentos</Description>
        <span className={`absolute -right-4 w-[.3rem] h-[160%] bg-primary rounded-lg ${page == 'atendimentos' ? '' : 'hidden'}`}></span>
      </section>

      <section onClick={() => push('estoque')} className='button relative gap-3 flex justify-start items-center cursor-pointer'>
        <Svg.Boxes className={`w-6 h-6 ${ page == 'estoque' ? 'fill-primary' : 'fill-color-1'}`}/>
        <Description className={`mt-1 ${ page == 'estoque' ? 'text-primary' : ''}`}>Estoque</Description>
        <span className={`absolute -right-4 w-[.3rem] h-[160%] bg-primary rounded-lg ${page == 'estoque' ? '' : 'hidden'}`}></span>
      </section>

      <section onClick={() => push('configuracoes')} className='mt-auto gap-2 flex justify-center items-center'>
        <Svg.Gear className={`w-4 h-4 button ${ page == 'configuracoes' ? 'fill-primary' : 'fill-color-1'}`}/>
        <Label className=''>versão <b className='text-primary'>{Package.version}</b></Label>
      </section>

    </aside>

  )
}

export default memo(Aside)