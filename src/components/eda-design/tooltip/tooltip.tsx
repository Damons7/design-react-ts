import React from 'react'
import './tooltip.less'
import { classNames } from './../utils/index';
import { useState } from 'react';
type IPlacement = "top"|"bottom"|"left"|"right"
interface IToolTip {
    className?: string,
    placement?: IPlacement
    title: string,
    children?: React.ReactNode,
}
export const Tooltip = (props: IToolTip) => {
    const { className, placement="top", title, children,...rest } = props
    const [open, setOpen] = useState(false)
    const classes = classNames("eda-tooltip-wrap","",{
    })
    const classesTitle = classNames("eda-tooltip-title","",{
        ["eda-tooltip-"+placement]:placement,
        "eda-tooltip-title-show": open
    })
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<
                any
            >;
            const { displayName } = childElement.type;
            return React.cloneElement(childElement, {
                index: index.toString(),
                ...rest,
            });

        });
    };
    return (
        <div className={classes}>
            <div onMouseEnter={()=>{
                setOpen(true)
            }}
            onMouseLeave={()=>{
                setOpen(false)
            }}
            >
            {renderChildren()}
            </div>
            <span className={classesTitle}>{title}</span>
        </div>
    )

}

Tooltip.displayName = "Tooltip"

export default Tooltip