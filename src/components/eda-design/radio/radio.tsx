import React, { createContext, useEffect } from 'react'
import './radio.less'
import { IRadioItemProps, RadioItem } from './radioItem';
import { useState } from 'react';
import { classNames } from './../utils/index';
type buttonStyle = "outline" | "solid"
type selectCallBack = (value: string) => void;
interface IRadioProps {
    className?: string,
    buttonStyle?: buttonStyle,
    value?: string,
    defaultValue?: any,
    children?: React.ReactNode
    type?: string;
    name: string;
    onChange?: (value: any) => void,
}
interface ParentRadio extends React.FC<IRadioProps> {
    Group?: React.FC<any>;
    Item: React.FC<IRadioItemProps>;
}
interface IRadioContext {
    value: string;
    type?: string;
    name: string;
    selList?: string[];
    onSelect?: selectCallBack;
}
export const RadioContext = createContext<IRadioContext>({ value: "", name: "" });
export const Radio: ParentRadio = (props) => {
    const { className, name, type = "button", defaultValue, value, buttonStyle, children, onChange } = props
    const [val, setVal] = useState(defaultValue ? defaultValue : "")
    const [selList, setSelList] = useState<string[]>(Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [])
    const classes = classNames("eda-radio-group", className, {
        [" eda-radio-group-" + buttonStyle]: buttonStyle
    })
    useEffect(() => {
        if(String(value).trim()===""){
            setSelList([])
            setVal("")
            return 
        }
        setVal(value ? value : defaultValue)
        
    }, [value, defaultValue])
    const handleClick = (value: string) => {
        if (type === "checkbox") {
            const index = selList.indexOf(value)
            if (index === -1) {
                let newList = [...selList, value]
                setSelList(newList)
                onChange && onChange(newList)
            } else {
                let newList = [...selList]
                newList.splice(index, 1)
                setSelList(newList)
                onChange && onChange(newList)
            }

        } else {
            setVal(value)
            onChange && onChange(value)
        }

    };
    const passedContext: IRadioContext = {
        value: val,
        selList,
        type,
        name,
        onSelect: handleClick,
    };

    return <div className={classes}>
        <RadioContext.Provider value={passedContext}>
            {children}
        </RadioContext.Provider>
    </div>
}
Radio.Item = RadioItem
Radio.displayName = "Radio"
Radio.defaultProps = {
    buttonStyle: "outline"
}
export default Radio