import React, { useState, createContext, useEffect } from "react";
import { classNames } from "../utils";
import "./select.less";
import { Icon } from "../icon/Icon";
import { Input } from "./../input/input";
import { Option, OptionProps } from './option';
type changeCallBack = (value?: any, content?: any, type?: string) => void;
interface ISelectContext {
  onChange?: changeCallBack;
  selectValue?: string,
  content?: string
}
interface ParentSelect extends React.FC<SelectProps> {
  Option: React.FC<OptionProps>;
}
export const SelectContext = createContext<ISelectContext>({});
export interface BaseSelectProps {
  defaultValue?: string;
  type?: string;
  disabled?: true;
  className?: string;
  placeholder?: string,
  onFocus?: changeCallBack;
  onBlur?: changeCallBack;
  onChange?: changeCallBack;
  onSearch?: changeCallBack;
  onInput?: changeCallBack;
  suffix?: React.ReactNode

}
type NativeSelectProps = BaseSelectProps
//Partial 设置为可选属性
export type SelectProps = Partial<NativeSelectProps>;
export const Select: ParentSelect = (props) => {
  const { className, placeholder,onInput, suffix, defaultValue = "", type, disabled, onChange, onFocus, onBlur, onSearch, children, ...restProps } = props;
  let [reverse, setReverse] = useState("");
  let [natValue, setNatValue] = useState(defaultValue ? defaultValue : "");
  let [content, setContent] = useState("");
  useEffect(() => {
    setNatValue(defaultValue)
  }, [defaultValue])

  const classes = classNames("eda-select eda-select-inner", className, {
    "eda-select-disabled": disabled,
  });
  const clickHandle = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (reverse === "is-reverse") {
      setReverse("");
    } else {
      setReverse("is-reverse");
    }
  };
  const inputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if(suffix){
      setContent(event.target.value)
      onInput&&onInput(event.target.value)
    }else{
      setNatValue("")
      setContent("")
    }

  }
  const handleClick = (value: string = "", content: string = "", type?: string) => {
    setNatValue(value)
    setContent(content)
    if (onChange) {
      onChange(value)
    }
    if (!type) {
      setReverse("");
    }
  }
  const focusHandle = () => {
    setReverse("is-reverse");
    if (onFocus) {
      onFocus()
    }
  }
  const blurHandle = (event: React.FocusEvent<HTMLDivElement>) => {
    if (onBlur) {
      onBlur()
    }
    setReverse("");
  }
  const passedContext: ISelectContext = {
    onChange: handleClick,
    selectValue: natValue,
    content: content
  };
  return (
    <SelectContext.Provider value={passedContext}>
      <div className={classes} {...restProps} onBlur={(event: React.FocusEvent<HTMLDivElement>) => { blurHandle(event) }}>
        <Input value={content} placeholder={placeholder}
          onChange={inputChange}
          onFocus={() => { focusHandle() }}></Input>
        {suffix ? <span className="eda-input__base eda-input__suffix">{suffix}</span> : null}
        {suffix ? null : <span
          onClick={(event) => {
            clickHandle(event);
          }}
          className={`eda-input__base eda-input__suffix ${reverse}`}
        >
          <Icon type={`icon-jiantou`} iconType="jiantou"></Icon>
        </span>}
        <div className={`eda-select-dropdown ${reverse}`} >
          <div className="eda-dropdown__list">
            {children}
          </div>
        </div>
      </div>
    </SelectContext.Provider>

  );
};
Select.Option = Option
export default Select;
