import React,{CSSProperties} from 'react'
import { classNames } from './../utils/index';
import './icon.less'
interface IProps{
    type: string,
    className?: string,
    iconType?:string,
    color?:string,
    style?:CSSProperties,
    onClick?:()=>void
}

export function Icon(props: IProps){
    const {className,type,onClick,color,style,iconType} = props
    const classes = classNames("eda-icon", className,{})
    return ( iconType?<i onClick={onClick} style={style?style:{color:color}} className={`iconfont icon-${iconType} ${classes}`}></i>
        :<svg className={classes}  onClick={onClick} color={color} style={style} aria-hidden="true">
            <use xlinkHref={`#${type}`}></use>
    </svg>)
}

export default Icon