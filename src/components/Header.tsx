import React, { memo } from 'react'
import { Description } from './texts/Texts'
import useUser from '@/hooks/useUser'
import UserHeader from './pages/UserHeader'
import MenuHeader from './pages/MenuHeader'

function Header() {



    return (

        <header className='w-full flex justify-start p-2 border border-x-0 bg-background-2'>

            <MenuHeader className=''/>
        
            <UserHeader className='ml-auto'/>

        </header>

    )
}

export default memo(Header)