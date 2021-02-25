
import React, { HTMLAttributes } from 'react'
import './breadcrumb.less'
import { classNames } from '../utils/index';
import BreadcrumbItem from './breadcrumbItem';
import { NativeBreadcrumbItemProps } from './breadcrumbItem'
interface ParentBreadcrumb extends React.FC<NativeBreadcrumbProps> {
    Item: React.FC<NativeBreadcrumbItemProps>;
}
interface IBreadcrumb {
    className?: string,
    separator?: React.ReactNode
}
//交叉类型
type NativeBreadcrumbProps = IBreadcrumb & Partial<HTMLAttributes<HTMLElement>>;

export const Breadcrumb: ParentBreadcrumb = (props) => {
    const { className, separator = "/", children, ...restProps } = props
    const classes = classNames("eda-breadcrumb", className, {
    })
    const renderChildren = () => {
        let len = 0
        if(Array.isArray(children)){
            len  = children.length
        }
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<
            NativeBreadcrumbItemProps
            >;
            if (!childElement.type) return console.error("Warning: Breadcrumb has a child whick is not a BreadcrumbItem");
            const { displayName } = childElement.type;
            if (displayName === "BreadcrumbItem") {
                return React.cloneElement(childElement, {
                    separator: len-1===index? "":separator,
                    isEnd: len-1===index
                });
            } else {
                console.error("Warning: Breadcrumb has a child whick is not a BreadcrumbItem");
            }
        });
    };
    return (<div className={classes} {...restProps}>
        {renderChildren()}
    </div>)
}
Breadcrumb.Item = BreadcrumbItem
export default Breadcrumb 