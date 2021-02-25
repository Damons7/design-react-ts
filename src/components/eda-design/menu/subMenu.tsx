import React, { useContext, useState } from "react";
import {classNames} from "../utils/index";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
 interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}
export const SubMenu: React.FC<SubMenuProps> = ({
  index = "0",
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpend =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isOpend);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 100);
  };
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
      const triangleClass = classNames("triangle-base", "",{
        "triangle-down": !menuOpen,
        "triangle-up": menuOpen,
      });
  const renderChildren = () => {
    const subMenuClasses = classNames("eda-submenu", "",{
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      const { displayName } = childElement.type;

      if (displayName === "MenuItem"||displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem");
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        {children?<div  className={triangleClass}></div>:null}
      </div>
      {children?renderChildren():null}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;