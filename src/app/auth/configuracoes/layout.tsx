import Aside from '@/components/Aside'
import Header from '@/components/Header'
import { AppProvider } from '@/contexts/AppContext'
import { UserProvider } from '@/contexts/UserContext'
import React from 'react'

interface Props {

    children: React.ReactNode

}

export default function layout({children}: Props) {


    return (

        <>{children}</>

    )

}



