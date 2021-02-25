import React, { useState } from 'react'
import { classNames } from '../utils'
import './switch.less'
type changeCallBack = (value: boolean) => void;
export interface BaseSwitchProps {
    defaultChecked ?: boolean,
    disabled?: true,
    className?: string;
    onChange?:changeCallBack
}
type NativeSwitchProps = BaseSwitchProps;
//Partial 设置为可选属性
export const Switch: React.FC<NativeSwitchProps> = (props) => {
    const {
        className,
        defaultChecked,
        disabled,
        onChange,
        ...restProps
    } = props;
    const [checked,setChecked] = useState(defaultChecked ?true :false)
    const classes = classNames("eda-switch", className, {
        'eda-switch-checked': checked,
        'eda-switch-disabled': disabled,
    });
    const changHandle = ()=>{
        if(disabled)return
        let flag = !checked
        setChecked(flag)
        if(onChange){
            onChange(flag)
        }

    }
    return <div className="eda-switch-wrap" {...restProps}>
            <button className={classes} onClick={()=>{
                changHandle()
            }}>
            <div className="eda-switch-handle"></div>
            <span className="eda-switch-inner"></span>
            </button>

    </div>
}
export default Switch

