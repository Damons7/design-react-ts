import React, { FC,useEffect, useRef, useState } from "react";
import { classNames } from "../utils";
import "./tag.less";
import Icon from "../icon/Icon";
export type TagType = "success" | "default" | "info" | "warning" | "danger";
export type sizeType = "sm" | "lg" | "md"

// success/info/warning/danger

interface BaseMessageProps {
    className?: string;
    message?: React.ReactNode;
    type?: TagType;
    style?:React.CSSProperties;
    closable: boolean;
    children: React.ReactNode;
    color: string
    size: sizeType,
    edit?: boolean
    close: () => void
    click: () => void
    blur:(val?:string)=>void
}
//交叉类型
type NativeMessageProps = BaseMessageProps;

//Partial 设置为可选属性
export type MessageProps = Partial<NativeMessageProps>;

export const Tag: FC<MessageProps> = (props) => {
    const [visibility, setVisibility] = useState(true);
    const {
        type = "default",
        message,
        style,
        close,
        click,
        edit,
        blur,
        className,
        children,
        closable,
        ...restProps
    } = props;
    const inputRef = useRef<HTMLInputElement>(null)
    const [editShow, setEditShow] = useState(false);
    const [val, setVal] = useState("")
    // btn, btn-lg, btn-primary
    const classes = classNames("eda-tag", className, {
        [`eda-tag-${type}`]: type && !edit,
        "eda-tag-edit": edit,
        "eda-tag-edit-show": editShow,
        [`eda-tag-none`]: !visibility,
    });
    const clickHandle = () =>{
        if(edit&&!editShow){
            setEditShow(true)
        }
        click && click()
    }
    useEffect(() => {
        editShow&&inputRef.current?.focus()
    }, [editShow]);
    return (
        <span style={style} onClick={() => {
            clickHandle()
        }} className={classes} {...restProps}>
            {
                editShow ? <input className="eda-tag-input" ref={inputRef}  value={val} onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                    setVal(event.target.value)
                }} onBlur={()=>{
                    setEditShow(false)
                    blur&&blur(val)
                    setVal("")
                }}/> : <>
                    {children}
                    {
                        closable ?
                            <Icon onClick={() => {
                                close && close()
                                setVisibility(false);
                            }} className="font-size eda-tag-close" type="" iconType="webicon309"></Icon>
                            : null
                    }
                </>
            }

        </span>
    );
};

Tag.defaultProps = {
    type: "default",
};

export default Tag;
