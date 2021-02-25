import React, { FC, useState } from "react";
import { classNames } from '../utils'
import './dropdown.less'
type IPosition = "center" | "left" | "right"
type IType = "click" | "hover"
interface BaseDropDownProps {
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    overlayClassName?: string
    overlayStyle?: React.CSSProperties
    overlay?: React.ReactNode
    arrow?: string;
    width?: number;
    positionClass?: string;
    showArrow?: boolean,
    position?: IPosition;
    type?: IType
}
//交叉类型

export const DropDown: FC<BaseDropDownProps> = (props) => {
    const {
        className,
        disabled,
        children,
        overlay,
        positionClass = "",
        position = "center",
        showArrow,
        type = "hover",
        ...restProps
    } = props;
    let [dropOpen, setDropOpen] = useState(false)
    const classes = classNames("eda-dropdown", className, {
    });


    const Events =
        type === "hover"
            ? {
                onMouseEnter: (e: React.MouseEvent) => {
                    setDropOpen(true)
                    timer && clearTimeout(timer)
                },
                onMouseLeave: (e: React.MouseEvent) => {
                    timer = setTimeout(() => {
                        setDropOpen(false)
                        clearTimeout(timer)
                    }, 50)
                },
            }
            : {
                onClick:()=>{
                    setDropOpen(!dropOpen)
                }
            };

    const classesMenu = classNames("eda-dropdown-list", positionClass, {
        "eda-dropdown-open": dropOpen,
        ["eda-dropdown-" + position]: position,
    });
    let timer: NodeJS.Timeout;
    return (
        <div className={classes}  {...restProps} {...Events}>
            {children}
            <ul className={classesMenu}>
                {overlay}
            </ul>
        </div>
    );
};

DropDown.defaultProps = {
};

export default DropDown;
