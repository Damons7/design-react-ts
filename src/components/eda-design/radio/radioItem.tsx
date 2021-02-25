import React, { useContext, useEffect, useRef, useState } from 'react'

import './radio.less'
import { classNames } from './../utils/index';
import { RadioContext } from './radio'
export interface IRadioItemProps {
    value: string,
    disabled?: boolean,
    children: React.ReactNode,
    type?: string;
}
//square
export const RadioItem = (props: IRadioItemProps) => {
    const { disabled, value, type, children } = props
    const context = useContext(RadioContext);
    const [types, setTypes] = useState(type ? type : context.type)
    let checked = (types === "checkbox" ? context.selList?.includes(value) : context.value === value)
    const [check, setCheck] = useState(checked)
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        let checked = (types === "checkbox" ? context.selList?.includes(value) : context.value === value)
        setCheck(checked)
    }, [context.value, context.selList, types, value]);
    let classes = classNames("eda-radio-" + types + "-wrapper", "", {
        ["eda-radio-" + types + "-wrapper-checked"]: check,
        ["eda-radio-" + types + "-wrapper-disabled"]: disabled,
    })
    let classesSpan = classNames("", "", {
        ["eda-radio-" + types]: types,
        ["eda-radio-" + types + "-checked"]: check,
        ["eda-radio-" + types + "-disabled"]: disabled,
    })
    const inputChange = ()=>{
        if(inputRef.current){
            inputRef.current.checked = !inputRef.current.checked
        }
    }
    return <label className={classes} onClick={(e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
        inputChange()
        context.onSelect && !disabled && context.onSelect(value)
    }}>
        <span className={classesSpan}>
            <input name={context.name}
                ref={inputRef}
                onChange={() => {
                    
                }}
                type={types === "checkbox" ? types : "radio"}
                className="eda-radio-button-input"
                checked={check}
                // defaultChecked={check}
                value={value}
            // defaultChecked={checked} 
            // value={check ? value : ""}
            />
            <span className={"eda-radio-" + types + "-inner"}></span>
        </span>
        <span className={check?"eda-checked-label":""}>{children}</span>
    </label>
}
export default RadioItem