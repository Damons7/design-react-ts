import React, { FC, useContext, HTMLAttributes, useEffect } from "react";
import { classNames } from "../utils";
import "./select.less";
import { SelectContext } from './select'
export interface BaseOptionProps {
    value: string;
}
type NativeOptionProps = BaseOptionProps & HTMLAttributes<HTMLElement>;
//Partial 设置为可选属性
export type OptionProps = Partial<NativeOptionProps>;
export const Option: FC<OptionProps> = (props) => {
    const { className, value = "", children, ...restProps } = props;

    const context = useContext(SelectContext);
    const classes = classNames("eda-option eda-select-dropdown__item", className, {
        "eda-select-option": context.selectValue === value
    });

    const clickHandle = () => {
        if (context.onChange) {
            context.onChange(value, children)
        }
    }
    useEffect(() => {
        if (context.selectValue === value && context.onChange) {
            context.onChange(value, children, "first")
        }
    }, [context.selectValue])

    return (
        <li className={classes}  {...restProps} onMouseDown={() => {
            clickHandle()
        }}>
            {children}
        </li>
    );
};
export default Option;
