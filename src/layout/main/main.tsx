import React, { ReactNode } from 'react'
import './main.less'
interface MainProps{
    children: ReactNode
}
export default function Main(props:MainProps){
    return <main className="main">
                {props.children}
            </main>
}