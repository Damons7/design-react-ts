import React from 'react'
import { classNames } from '../utils'
import './spin.less'
import { Icon } from './../icon/Icon';
export interface BaseSpinProps {
    className?: string;
    tip?:string;
    spinning: boolean
}
type NativeSpinProps = BaseSpinProps;
//Partial 设置为可选属性
export const Spin: React.FC<NativeSpinProps> = (props) => {
    const {
        className,
        spinning,
        tip,
        children,
        ...restProps
    } = props;
    const classes = classNames("eda-spin-nested-loading", className, {
    });
    const loading = classNames("eda-spin", className, {
        "eda-spin-spinning": spinning
    });
    return <div className={classes} {...restProps}>
                <div className={loading}>
                       <Icon type="" className="eda-spin-dot eda-spin-dot-spin eda-spin-dot-spin-icon" iconType="loading1"></Icon>
                       <span className="eda-spin-text">{tip}</span>
                </div>
            <div className="eda-spin-container eda-spin-blur">
                {children}
            </div>
        </div>

}
export default Spin

