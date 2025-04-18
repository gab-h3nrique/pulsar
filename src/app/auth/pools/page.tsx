'use client'

import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import Status from '@/components/elements/Status'
import { Table, Td, Tr, Th, Tbody } from '@/components/elements/Table'
import Svg from '@/components/icons/Svg'
import PoolModal from '@/components/modals/pool/PoolModal'
import Observer from '@/components/Observer'
import { Description, Label, Subtitle } from '@/components/texts/Texts'
import { useNotification } from '@/hooks/useNotaification'
import Api from '@/providers/http'
import { PoolType } from '@/types/poolType'
import { useRouter, usePathname } from 'next/navigation'
import React, { memo, use, useEffect, useState } from 'react'


function Page() {

  const router = useRouter()
  const pathname = usePathname()

  const notification = useNotification()

  const socketUrl = process.env.SOCKET_URL

  const [ filter, setFilter ] = useState({ input: '', date: '', })

  const [ array, setArray ] = useState<PoolType[]>([])

  const [ total, setTotal ] = useState(0)

  const [ page, setPage ] = useState(1)

  const [ limit, setLimit ] = useState(25)

  const [ loading, setLoading ] = useState(false)

  const [ selected, setSelected ] = useState<PoolType | null>(null)

  const [ modal, setModal ] = useState(false)

  async function copyContent(value: string) {

    try {

      await navigator.clipboard.writeText(value)

      notification({ type: 'success', title: 'Copied', description: 'Content copied to clipboard.' })

    } catch (error: any) {

      notification({ type: 'error', title: 'Attention', description: `Failed to copy: ${error.message}` })

    }

  }

  async function getPaginated(pageParam: number, search?: boolean) {

    try {
      
      setLoading(true)

      const { data, total, success, message, ...rest } = await Api.get('/auth/pool', { page: pageParam, limit: limit, ...filter })

      if(!success) return notification({ type: 'error', title: 'Attention', description: 'Any data was found.' })

      console.log('pageParam: ', pageParam)

      setPage(pageParam)

      setTotal(total || 0)

      if(search) setArray(data)
      else setArray(prev => ([ ...prev, ...data ]))

    } catch (error) {

      return notification({ type: 'error', title: 'Ops!', description: 'There was an error fetching the data.' })
      
    } finally {

      setLoading(false)

    }

  }

  function openModal(item: PoolType | null) {

    const newUrl = `${pathname}?modal=${item?.id || ''}`;

    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

    setSelected(item)
    setModal(true)

  }

  function closeModal(data?: any) {

    const newUrl = `${pathname}`;

    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

    setSelected(null)
    setModal(false)

    if(!data) return

    const { updated, deleted } = data

    if(deleted && deleted.id) setArray(prev => prev.filter(e => e.id !== deleted.id) )

    if(updated && updated.id) {

      const index = array.findIndex(e => e.id == updated.id)

      if(index !== -1) setArray(prev => (prev.map(e => e.id === updated.id ? updated : e )))
      else setArray(prev => [ updated, ...prev ])

    }

  }

  useEffect(()=> {

    getPaginated(1)

  }, [])


  return (  

    <div className='gap-1 w-full h-full flex flex-col relative'>

      <Subtitle className='font-semibold'>Pools</Subtitle>

      <Description onClick={router.back} className='flex gap-1 cursor-pointer w-fit'>
        <Svg.Angle className='w-4 h-4 fill-color-1 dark:fill-color-1-dark -rotate-90 mt-[.25rem]'/>
        back
      </Description>

      <section className='mt-3 w-full h-full flex flex-col gap-4'>

        <div className='gap-4 flex w-full justify-end'>
          <Input className='w-44' type='text' onChange={(e) => setFilter((prev) => ({...prev, input: e.target.value}))} value={filter.input} placeholder='Pesquisar' icon={<Svg.MagnifyingGlass className='fill-color-2 dark:fill-color-3 mt-[.15rem] w-5 h-5'/>}/>
          <Button className='bg-primary overflow-hidden text-background-2 dark:text-background-2-dark' onClick={() => openModal(null)}>
            <Svg.Plus className='w-5 h-5 fill-background-2 dark:fill-background-2-dark'/>
            New pool
          </Button>
        </div>


        <Table className='w-full'>
          <Tbody className='w-full h-fit'>
            <Tr>
              <Th className='text-start font-semibold max-w-40'>Name</Th>
              <Th className='text-start font-semibold'>Link</Th>
              <Th className='text-start font-semibold max-w-[30rem] hidden md:flex'>Token</Th>
            </Tr>

            { array.map((item, i)=> (

              <Tr key={`id-${i}`} className='list' onClick={() => openModal(item)}>
                <Td className='text-start font-semibold max-w-40'>{ item.name }</Td>
                <Td className='text-start font-semibold flex gap-2 truncate'>
                  <span className="truncate">{ `${socketUrl}/pool/${item.name}-${item.id}` }</span>
                  <Svg.Copy onClick={(e) => { e.stopPropagation(); copyContent(`${socketUrl}/pool/${item.name}-${item.id}`) }} className='w-4 h-4 min-w-4 mih-h-4 fill-color-2 dark:fill-color-2-dark'/>
                </Td>
                <Td className='text-start font-semibold max-w-[30rem] hidden md:flex'>
                  <span className="truncate">{ item.token }</span>
                  <Svg.Copy onClick={(e) => { e.stopPropagation(); copyContent(item.token) }} className='w-4 h-4 min-w-4 mih-h-4 fill-color-2 dark:fill-color-2-dark'/>
                </Td>
              </Tr>

            ))}

            { loading &&
              <Tr className='list'>
                <Td className='text-start font-semibold max-w-40'><Svg.Spinner className='w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4]'/></Td>
                <Td className='text-start font-semibold'><Svg.Spinner className='w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4]'/></Td>
                <Td className='text-start font-semibold max-w-[30rem] hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4]'/></Td>
              </Tr>
            }

          </Tbody>
        </Table>

        <Button onClick={() => !loading && getPaginated((page + 1))} className={`w-full flex justify-center border-0 bg-transparent ${ array.length >= total ? 'hidden' : ''}`}>
          <Observer isIntersecting={()=> !loading && getPaginated((page + 1))}/>
          <Description>{ !loading ? 'Carregar mais' : 'Carregando...' }</Description>
        </Button>

      </section>

      <PoolModal isOpen={modal} onClose={data => closeModal(data)} item={selected ? selected : undefined}/>

    </div>

  )

}

export default memo(Page)