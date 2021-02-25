import React, { TextareaHTMLAttributes, useState, useEffect } from 'react'
import { classNames } from '../utils'
import './textarea.less'
type changeCallBack = (value: string) => void;
export interface BaseTextareaProps {
    value?: string,
    rows?: number;
    cols?: number;
    disabled?: true,
    className?: string;
    resize?: boolean;
    inputTextNullTip?: string,
    showTip?: {
        text: boolean,
        border: boolean
    } | boolean,
    onChangeInput?: changeCallBack
}

type NativeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & BaseTextareaProps;
//Partial 设置为可选属性
export type TextareaProps = Partial<NativeTextareaProps>;
export const Textarea: React.FC<TextareaProps> = (props) => {
    const {
        className,
        value = "",
        disabled,
        rows,
        resize,
        showTip,
        inputTextNullTip = "输入框不能为空",
        cols = 3,
        onChangeInput,
        ...restProps
    } = props;
    const [nativeValue, setNativeValue] = useState(value ? value : '')
    let [textNull, setTextNull] = useState(false)
    useEffect(() => {
        setNativeValue(value)
    }, [value]);
    let showBorder = showTip&&showTip!==true&&showTip.border===true
    const classes = classNames("eda-textarea-inner", className, {
        'eda-input-disabled': disabled,
        'eda-resize-disabled': !resize,
        'eda-input-null': ((showTip===true)&&textNull)||(showBorder&&textNull)
    });

    const changHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value: string = event.target.value
        setNativeValue(value)
        if (onChangeInput) {
            onChangeInput(value)
        }
    }
    return <div className="eda-input-textarea">
        <textarea value={nativeValue} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            changHandle(event)
        }} onBlur={() => {
            if (nativeValue === "") {
                setTextNull(true)
            } else {
                setTextNull(false)
            }
        }} rows={rows} cols={cols} {...restProps} className={classes} />
        {(showTip && textNull) ? <div className="inputTextNullTip">{inputTextNullTip}</div> : null}
    </div>
}
export default Textarea
