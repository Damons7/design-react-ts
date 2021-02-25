import React, { FC, useState } from "react";
import { classNames } from "../utils";
import "./alert.less";
import Icon from "../icon/Icon";
export type AlertType = "success" | "default" | "error" | "warning";
export type PositionType = "left" | "top" | "bottom" | "right";
interface IconType {
  [key:string]:string
}
const iconType:IconType = {
  "error":"Group-",
  "warning":"error",
  "success":"success",
  "default":"error1",
}
interface BaseAlertProps {
  className?: string;
  title?: React.ReactNode;
  position?: PositionType;
  message?: React.ReactNode;
  type?: AlertType;
  close:any;
  showIcon: any;
  children: React.ReactNode;
}
//交叉类型
type NativeAlertProps = BaseAlertProps;

//Partial 设置为可选属性
export type AlertProps = Partial<NativeAlertProps>;

export const Alert: FC<AlertProps> = (props) => {
  const [visibility, setVisibility] = useState(true);
  const {
    type ="default",
    title,
    message,
    position,
    className,
    children,
    close,
    showIcon,
    ...restProps
  } = props;
  // btn, btn-lg, btn-primary
  const classes = classNames("eda-alert", className, {
    [`alert-${type}`]: type,
    [`alert-${position}`]: position,
    [`alert-none`]: !visibility,
    "sm-font-size": !title
  });
  const iconClasses = classNames("font-size", "", {
    "sm-font-size": !title
  });

  return (
    <div className={classes} {...restProps}>
      {showIcon?
            <div className="alert-type-icon">
            <Icon className={iconClasses} type="" iconType={iconType[type]}></Icon>
          </div>:null  
      }
      <div className="alert-content">
        <span className="alert-title">{title}</span>
        <span className="alert-message">{message}</span>
      </div>
      {
        close?
              <div
              className="alert-close">
              <span
                    onClick={() => {
                      setVisibility(false);
                    }}>
                <Icon className="font-size" type="" iconType="guanbi"></Icon>
              </span>
              </div>
        :null
      }

    </div>
  );
};

Alert.defaultProps = {
  type: "default",
};

export default Alert;
