
import React, { HTMLAttributes } from 'react'
import './breadcrumb.less'
import { classNames } from '../utils/index';
import {Link} from 'react-router-dom'
interface IBreadcrumbItem {
    className?: string,
    separator?:React.ReactNode,
    isEnd?: boolean,
    to?:string,

    
}
//交叉类型
export type NativeBreadcrumbItemProps = IBreadcrumbItem & Partial<HTMLAttributes<HTMLElement>>;

export function BreadcrumbItem(props: NativeBreadcrumbItemProps) {
    const { className,separator,to,isEnd,children, ...restProps } = props
    const classes = classNames("eda-breadcrumb-item", className, {
    })
    const classesItem = classNames("", className, {
        "eda-breadcrumb-end":isEnd,
        "eda-breadcrumb-link": to
    })

    return (<div className={classes} {...restProps}>
                <span className={classesItem}>
                    {to?<Link to={to}>{children}</Link>:children}
                </span>{separator?<span className="eda-breadcrumb-separator">{separator}</span>:null}
    </div>)
}
BreadcrumbItem.displayName = "BreadcrumbItem";
export default BreadcrumbItem 