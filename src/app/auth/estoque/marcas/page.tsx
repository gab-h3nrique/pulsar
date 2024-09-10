'use client'

import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import { Table, Td, Tr, Th, Tbody } from '@/components/elements/Table'
import Svg from '@/components/icons/Svg'
import Observer from '@/components/Observer'
import { Description, Label, Subtitle } from '@/components/texts/Texts'
import { useNotification } from '@/hooks/useNotaification'
import Api from '@/providers/http'
import { BrandType } from '@/types/brandType'
import { ProductType } from '@/types/productType'
import Format from '@/utils/format'
import { useRouter } from 'next/navigation'
import React, { memo, use, useEffect, useState } from 'react'

function Page() {

  const router = useRouter()

  const notification = useNotification()

  const [ filter, setFilter ] = useState({ input: '', date: '', })

  const [ brandArray, setBrandArray ] = useState<BrandType[]>([])

  const [ total, setTotal ] = useState(0)

  const [ page, setPage ] = useState(1)

  const [ limit, setLimit ] = useState(5)

  const [ loading, setLoading ] = useState(false)

  async function getPaginated(pageParam: number, search?: boolean) {

    try {
      
      setLoading(true)

      const { brands, total, success, message, ...rest } = await Api.get('/api/auth/brands', { page: pageParam, limit: limit, ...filter })

      if(!success) return notification({ type: 'error', title: 'Atenção', description: 'Nenhuma dado foi encontrado.' })

      setPage(pageParam)

      setTotal(total || 0)

      if(search) setBrandArray(brands)
      else setBrandArray(prev => ([ ...prev, ...brands ]))

    } catch (error) {

      return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os dados.' })
      
    } finally {

      setLoading(false)

    }

  }

  // router.


  useEffect(()=> {

    getPaginated(1)

  }, [])


  return (

    <div className='gap-1 w-full h-fit flex flex-col'>

      <Subtitle className='font-semibold'>Marcas</Subtitle>

      <Description onClick={router.back} className='flex gap-1 cursor-pointer w-fit'>
        <Svg.Angle className='w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]'/>
        voltar
      </Description>

      <section className='mt-3 w-full h-full flex flex-col gap-4'>

        <div className='gap-4 flex w-full justify-end'>
          <Input className='w-44' type='text' onChange={(e) => setFilter((prev) => ({...prev, input: e.target.value}))} value={filter.input} placeholder='Pesquisar' icon={<Svg.MagnifyingGlass className='fill-color-2 mt-[.15rem] w-5 h-5'/>}/>
          <Button className='bg-primary overflow-hidden text-background-2'>
            <Svg.Plus className='w-5 h-5 fill-background-2'/>
            Novo produto
          </Button>
        </div>


        <Table className='w-full'>
          <Tbody className='w-full h-fit'>
            <Tr>
              <Th className='text-start font-semibold max-w-36'>Código</Th>
              <Th className='text-start font-semibold'>Marca</Th>
            </Tr>

            { brandArray.map((item, i)=> (

              <Tr key={`id-${i}`} className='list'>
                <Td className='max-w-36'>{ item.id }</Td>
                <Td>{ item.name }</Td>
              </Tr>

            ))}

            { loading &&
              <Tr className='list'>
                <Td className='max-w-36'><Svg.Spinner className='w-5 h-5 fill-background-2 opacity-[.4]'/></Td>
                <Td className=''><Svg.Spinner className='w-5 h-5 fill-background-2 opacity-[.4]'/></Td>
              </Tr>
            }

          </Tbody>
        </Table>

        <Button onClick={() => !loading && getPaginated((page + 1))} className={`w-full flex justify-center border-0 bg-transparent ${brandArray.length >= total ? 'hidden' : ''}`}>
          <Observer isIntersecting={()=> !loading && getPaginated((page + 1))}/>
          <Description>{ !loading ? 'Carregar mais' : 'Carregando...' }</Description>
        </Button>

      </section>

    </div>

  )

}

export default memo(Page)