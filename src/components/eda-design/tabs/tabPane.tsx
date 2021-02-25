import React, { FC, HTMLAttributes } from "react";
import { classNames } from '../utils'
export interface BaseTabPaneProps {
  index?: string;
  className?: string;
  /**设置 默认选项 */
  tab: React.ReactNode,
  children: React.ReactNode;
  onSelect?: (selectedIndex: string) => void;
}

//交叉类型
type NativeTabsProps = BaseTabPaneProps & HTMLAttributes<HTMLElement>;
//Partial 设置为可选属性
export type TabPaneProps = Partial<NativeTabsProps>;
export const TabPane: FC<TabPaneProps> = (props) => {
  const {
    className,
    children,
    index,
    onChange,
    ...restProps
  } = props;
  const classes = classNames("tab-pane-wrap", className, {
  });
  const renderChildren = () => {
    if(Array.isArray(children)){
       return  children.map((item,index)=>{
            const childElement = item as React.FunctionComponentElement<
            TabPaneProps
            >;
            return <div>{childElement}</div>
        })
    }
    return children
  };
return (
    <div className={classes} {...restProps}>
        {renderChildren()}
    </div>
);
};

TabPane.displayName = "TabPane"

export default TabPane;
