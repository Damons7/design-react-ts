import React, { ReactNode } from 'react'
import {post} from '@/config/axios'
interface PersonProps{
    children: ReactNode
}
export default function PersonWork(props:PersonProps){
    return <main>
            <div>
                left
                <button onClick={()=>{{post("/api/login",{"userName":"aiwa",password:"123456"})}}}>get</button>
            PersonWork
            {props.children}
            </div>
        <div >

            </div>
            <div>
            {props.children}
            </div>
        </main>
}
