import React, {createContext, ReactNode } from 'react'
import { useContext } from 'react';
interface PersonProps{
    children: ReactNode
}

export default function PersonCenter(props:PersonProps){
    return <main>
            <div>
                left
            </div>
            <div>
               {props.children}
            </div>
        </main>
}