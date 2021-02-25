import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { classNames } from '../utils'
import './button.less'
export type ButtonSize = "lg" | "sm" | "ssm";
export type ButtonType = "primary" | "default" | "success" | "danger" | "link" | "warning" | "action";

interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
  icon?:React.ReactNode
}
//交叉类型
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
//Partial 设置为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from '8'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    icon,
    ...restProps
  } = props;
  // btn, btn-lg, btn-primary
  const classes = classNames("eda-btn", className, {
    [`eda-btn-${btnType}`]: btnType,
    [`eda-btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children} {icon}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
