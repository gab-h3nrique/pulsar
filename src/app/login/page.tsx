'use client'

import Button from '@/components/elements/Button'
import Checkbox from '@/components/elements/Checkbox'
import Input from '@/components/elements/Input'
import Svg from '@/components/icons/Svg'
import { Description, Label, Paragraph, Subtitle, Title } from '@/components/texts/Texts'
import { useNotification } from '@/hooks/useNotaification'
import useUser from '@/hooks/useUser'
import Cookie from '@/providers/cookie'
import Api from '@/providers/http'
import React, { memo, useState } from 'react'
import { useRouter } from 'next/navigation'

function Page() {

  const { user, setUser } = useUser()

  const router = useRouter()

  const notification = useNotification()

  const [ userLogin, setUserLogin] = useState({ email: '', password: '' })

  const [ stayConnected, setStayConnected] = useState(false)

  const [ tried, setTried] = useState(false)
  
  const [ message, setMessage] = useState('')

  const [ loading, setLoading] = useState(false)

  async function login() {

    try {

      if(!userLogin.email && !userLogin.password) return notification({ type: 'warning', title: 'Atenção', description: 'preencha os campos obrigatórios.', time: 3000 })

      setLoading(true)

      const { user, token, message } = await Api.post('/api/login', { email: userLogin.email, password: userLogin.password })

      if(!token || !user) return setMessage('Usuário ou senha inválidas.')
  
      setUser(user)

      await Cookie.set('auth', token, (stayConnected ? 360 : 1))
    
      notification({ type: 'success', title: 'Sucesso!', description: 'Logado com sucesso!.', time: 1000 })

      setTimeout(()=> router.push('/auth'), 200)

      return 
      
    } catch (error: any) {

      setMessage(error.message)

    } finally {

      setLoading(false)

    }

  }

  return (
    
    <main className='flex w-full h-full'>

      <section className="gap-10 flex flex-col justify-center items-center w-full h-full bg-background-1">

        <Title>Login</Title>

        <Subtitle className='text-center'>Use suas credenciais para acessar o<br></br> sistema</Subtitle>

        <section className='flex flex-col gap-4'>

          <Input type='email' onChange={(e) => setUserLogin((prev) => ({...prev, email: e.target.value}))} value={userLogin.email} placeholder='Email' icon={<Svg.Envelope className='fill-white mt-[.15rem] w-5 h-5'/>}/>

          <Input type='password' onChange={(e) => setUserLogin((prev) => ({...prev, password: e.target.value}))} value={userLogin.password} placeholder='Senha' icon={<Svg.Key className='fill-white mt-[.15rem] w-5 h-5'/>}/>

          <Description className='flex gap-2 cursor-pointer opacity-80'>
            <Checkbox onChange={(e) => setStayConnected((prev) => e.target.checked)} value={stayConnected} className={`w-5 h-5 `}/>
            Manter conectado
          </Description>

          <Description className='text-red-500/60'>{message}</Description>

          <Button onClick={login} className='flex gap-2 justify-center items-center w-full bg-primary'>
            <Svg.Spinner className={`w-5 h-5 ${!loading ? 'hidden' : ''}`}/>
            <Description>{ loading ? 'Entrando...' : 'Entrar'}</Description>
          </Button>

        </section>



      </section>

      <section className="hidden lg:flex justify-center items-center w-full h-full bg-primary">

        <Svg.Logo className='fill-white w-[345px] h-[180px]'/>

      </section>


    </main>

  )

}

export default memo(Page)