import React, {FC,  useState,CSSProperties } from "react";
import { classNames } from "../utils";
import "./message.less";
import Icon from "../icon/Icon";
export type MessageType = "success" | "default" | "error" | "warning"|"primary";
export type PositionType = "left" | "top" | "bottom" | "right";
interface IconType {
    [key: string]: string
}

const iconType: IconType = {
    "error": "Group-",
    "warning": "error",
    "success": "success",
    "default": "error",
    "primary": "error",
}
interface BaseMessageProps {
    className?: string;
    position?: PositionType;
    message?: React.ReactNode;
    type?: MessageType;
    close: boolean;
    style?:CSSProperties,
    children: React.ReactNode;
    id:string,
    closeCallback?:()=>void
}
//交叉类型
type NativeMessageProps = BaseMessageProps;

//Partial 设置为可选属性
export type MessageProps = Partial<NativeMessageProps>;

export const Message: FC<MessageProps> = (props) => {
    const [visibility, setVisibility] = useState(true);
    const {
        type = "default",
        message,
        position,
        className,
        children,
        close,
        style,
        id,
        closeCallback,
        ...restProps
    } = props;
    // btn, btn-lg, btn-primary
    const classes = classNames("eda-message", className, {
        [`eda-message-${type}`]: type,
        [`eda-message-${position}`]: position,
        [`eda-message-none`]: !visibility,
        [`eda-message-type`]: type!=="default"
    });
    const iconClasses = classNames("font-size", "", {

    });
    
    return (
        <div id={id} className={classes} style={style} {...restProps}>
            <div className="eda-type-icon">
                <Icon className={iconClasses} type="" iconType={iconType[type]}></Icon>
            </div>
            <div className="eda-message-content">
                <span className="eda-message-custom-content">{message}</span>
            </div>
            {
                close ?
                    <div
                        className="message-close">
                        <span
                            onClick={() => {
                                setVisibility(false);
                                closeCallback&&closeCallback()
                            }}>
                            <Icon className="font-size" type="" iconType="webicon309"></Icon>
                        </span>
                    </div>
                    : null
            }

        </div>
    );
};

Message.defaultProps = {
    type: "default",
};



export default Message;
