"use client"

import { UserProvider } from '@/contexts/UserContext'
import useApp from '@/hooks/useApp'
import useGlobal from '@/hooks/useApp'
import React, { memo, useState } from 'react'
import Button from '@/components/elements/Button'
import Select from '@/components/elements/Select'
import Modal from '@/components/modals/Modal'

const page = () => {


    const [ options, setOptions ] = useState<any[]>([ {name: 'Gabriel', age: 25}, {name: 'Mateus', age: 25}, {name: 'Joao', age: 25}, {name: 'Pedro', age: 25} ])

    const [ selected, setSelected ] = useState<any>({ name: '', age: 0 })

    return (

        <div className='flex flex-col justify-center items-center'>

            <Select data={options} value={selected.name || 'selecione'} renderItem={(item, i) => item.name}/>

        </div>
        
    )


}

export default memo(page)