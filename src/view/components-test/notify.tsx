import React,{useState} from 'react'
import ReactDOM from 'react-dom'

export const Notify = ()=>{
    const [list, setList] = useState<any>([]);
    const filter = (id:string)=>{
        const newList = list.filter((item:any)=>{
            return item.id !== id
        })
        setList(newList)
    }
    return ReactDOM.createPortal(<div>
        
    </div>,document.body)
}