
import React, {  ReactNode } from 'react'
import './mask.less'
import { classNames } from './../utils/index';
interface IMask {
    className?: string,
    children?:ReactNode
}
//交叉类型
type NativeMaskProps = IMask ;

export const Mask = (props: NativeMaskProps)=>{
    const { className,children } = props
    const classes = classNames("eda-mask-wrap", className, {

    })

    return (<div className={classes}>
        {children}
    </div>)
}
export default Mask