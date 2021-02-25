import React, { FC  } from "react";
import { classNames } from '../utils'
import './dropdown.less'

interface BaseDropDownMenuProps {
  className?: string;
  children: React.ReactNode;
  style?:React.CSSProperties
}
//交叉类型

export const DropDownMenu: FC<BaseDropDownMenuProps> = (props) => {
  const {
    className,
    children,
    style,
    ...restProps
  } = props;
  const classes = classNames("eda-dropdown-menu", className, {
  });

    return (
      <div className={classes} style={style} {...restProps}>
        {children}
      </div>
    );
};

DropDownMenu.defaultProps = {
};

export default DropDownMenu;
