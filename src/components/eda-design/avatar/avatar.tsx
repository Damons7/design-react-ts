
import React, { ImgHTMLAttributes } from 'react'
import './avatar.less'
import { classNames } from './../utils/index';
export type AvatarType = "lg" | "ssm" | "sm" | "default" ;

interface IAvatar {
    size?: AvatarType,
    href: string,
    border?:any,
    alt?:string,
    className?: string
}
//交叉类型
type NativeAvatarProps = IAvatar & Partial<ImgHTMLAttributes<HTMLImageElement>>;

export function Avatar(props: NativeAvatarProps) {
    const { className,size,border,alt="", href,...restProps } = props
    // 设置头像大小的样式
    const classes = classNames("eda-avatar", className, {
        [size + "-avatar"]: size,

    })
     // 设置头像边框的样式
    const classesWrap = classNames("eda-avatar-wrap", className, {
        "eda-border-avatar": border,
    })
    return (<div className={classesWrap}>
        <img  className={classes} src={href} {...restProps} alt={alt} />
    </div>)
}
Avatar.defaultProps = {
    size: "default"
  };
  
export default Avatar