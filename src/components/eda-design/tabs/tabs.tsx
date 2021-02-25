import React, { useState,createContext } from "react";
import { classNames } from '../utils'
import TabPane from './tabPane'
import {TabPaneProps} from './tabPane'
import './tabs.less'
type changeCallBack = (selectedIndex: string) => void;

interface ITabsContext {
    index: string;
    onChange?: changeCallBack;
  }
export const TabsContext = createContext<ITabsContext>({ index: "0" });
interface ParentTabs extends React.FC<TabProps> {
    TabPane: React.FC<TabPaneProps>;
  }
interface BaseTabsProps {
  className?: string;
  /**设置 默认选项 */
  defaultActiveKey?: string;
  onChange?: changeCallBack;
  children: React.ReactNode;
}
//交叉类型
type NativeTabsProps = BaseTabsProps 
//Partial 设置为可选属性
export type TabProps = Partial<NativeTabsProps>;
export const Tabs: ParentTabs = (props) => {

  const {
    className,
    children,
    defaultActiveKey,
    onChange,
    ...restProps
  } = props;
  const [currentActive, setActive] = useState(defaultActiveKey);
  const classes = classNames("tabs", className, {
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onChange) {
       onChange(index);
    }
  };
  const passedContext: ITabsContext = {
    index: currentActive ? currentActive : "0",
    onChange: handleClick,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, currentIndex) => {
      const childElement = child as React.FunctionComponentElement<
      TabPaneProps
      >;
      
      const { displayName } = childElement.type;
        
      if (displayName === "TabPane") {
        return <div className={currentActive===String(currentIndex)?"tab-pane-active":"tab-pane"}>{childElement}</div>
        // React.cloneElement(childElement, {
        //   index: index.toString(),
        // });
      } else {
        console.error("Warning: Tabs has a child whick is not a TabPane");
      }
    });
  };
  const renderTab = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
      TabPaneProps
      >;
      const { displayName } = childElement.type;
      if (displayName === "TabPane") {
        return <div className={currentActive===String(index)?"active tab-item":"tab-item"} key={index} onClick={()=>{setActive(String(index))}}>{childElement.props.tab}</div>
      } else {
        console.error("Warning: Tabs has a child whick is not a TabPane");
      }
    });
  };

return (
    <TabsContext.Provider value={passedContext}>
        <div className={classes} {...restProps}>
            <div className="tab-list">
                {renderTab()}
            </div>
            <div className="tab-pane-wrap">
                {renderChildren()}
            </div>
        </div>
    </TabsContext.Provider>

);
};

Tabs.TabPane = TabPane;

export default Tabs;
