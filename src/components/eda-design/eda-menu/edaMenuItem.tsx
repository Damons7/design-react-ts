import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { classNames } from "../utils/index";
import { MenuContext } from "./edaMenu";
import "./edaMenu.less";
export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    onSelect?: (selectedIndex: string) => void;
    to?: string;
    activeClass?: string;
    hoverClass?: string;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
    const history = useHistory();
    const {
        className,
        icon,
        to = "",
        activeClass,
        hoverClass,
        disabled,
        style,
        children,
        index = "0",
    } = props;
    const [hover, setHover] = useState(false);

    const context = useContext(MenuContext);
    const classes = classNames("eda-menu-item", className, {
        "is-disabled": disabled,
        [hoverClass ? hoverClass : "eda-menu-item-hover"]: hover,
        [activeClass ? activeClass : "is-active"]: context.index === index,
    });
    const handleClick = () => {
        if (context.onSelect && !disabled && typeof index === "string") {
            context.onSelect(index);
            to && history.push(to);
        }
        if (context.onSubClick && !disabled && typeof index === "string") {
            !index.startsWith("-") && context.onSubClick(index);
        }
    };
    const mouseEnter = () => {
        setHover(true);
    };
    const mouseLeave = () => {
        setHover(false);
    };
    const styles = { ...style, paddingLeft: index.split("-").length * 25 };
    return (
        <li
            className={classes}
            onMouseEnter={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                e.stopPropagation();
                mouseEnter();
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                e.stopPropagation();
                mouseLeave();
            }}
            style={styles}
            onClick={handleClick}
        >
            {icon ? <span style={{ marginRight: 14 }}>{icon}</span> : null}{" "}
            <span>{children}</span>
        </li>
    );
};
MenuItem.defaultProps = {};
MenuItem.displayName = "MenuItem";
export default MenuItem;
