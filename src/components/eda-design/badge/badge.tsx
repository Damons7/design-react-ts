
import React, { HTMLAttributes } from 'react'
import './badge.less'
import { classNames } from '../utils/index';
export type BadgeType = "lg" | "ssm" | "sm" | "default";

interface IBadge {
    bgColor?: string,
    className?: string,
    count: number;
    overflowCount?: number;
}
//交叉类型
type NativeBadgeProps = IBadge & Partial<HTMLAttributes<HTMLElement>>;

export function Badge(props: NativeBadgeProps) {
    const { className, bgColor, children, overflowCount = 99, count = 0, ...restProps } = props
    const classes = classNames("eda-badge", className, {
    })
    const classesCount = classNames("eda-badge-count", "", {
        "eda-count-overflow": count > overflowCount
    })
    return (<div className={classes} {...restProps}>
        {children}
        <span className={classesCount} style={{ color: bgColor }}>
            {count > overflowCount ? overflowCount + "+" : count}
        </span>
    </div>)
}

export default Badge 