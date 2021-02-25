import React, { ReactNode } from 'react';
import './table.less'
import { classNames } from './../utils/index';
import { IPagination, Pagination } from './../pagination/pagination';
interface IColumns {
    title: string,
    dataIndex: string,
    key: string,
    align?: string,
    className?: string,
    ellipsis?: boolean,
    width?: number,
    render?: (item: string) => ReactNode
}
interface IDataSource {
    [key: string]: any
}
interface IRender {
    [key: string]: any
}
interface ITableProps {
    columns: IColumns[];
    className?: string;
    dataSource: IDataSource[];
    rowClassName?: string;
    children?: ReactNode,
    stripe?: boolean,//是否显示样式
    loading?: boolean,
    width?: number;
    pagination?: IPagination,
    scroll?: { x?: boolean, y?: boolean };
    style?: React.CSSProperties;
    onRow?: (record: any) => {
        // onClick: event => {}, // 点击行
        // onDoubleClick: event => {},
        // onContextMenu: event => {},
        // onMouseEnter: event => {}, // 鼠标移入行
        // onMouseLeave: event => {},
    }

}

export const Table = (props: ITableProps) => {
    const { columns, dataSource, width, className, rowClassName = "", style, scroll, stripe, pagination } = props
    let classTr = classNames("", "", {
        "eda-table-row-stripe": stripe
    })
    let classTable = classNames("eda-table-scroll", className, {
    })
    const renderHeader = (columns: IColumns[]) => {
        let jsxHeader = (<tr className={rowClassName}>{columns.map((item: IColumns) => {
            return <th className="is-leaf" key={item.title}>
                <div className="cell">
                    {item.title}
                </div>
            </th>
        })}</tr>)
        return jsxHeader
    }
    const renderBody = (dataSource: IDataSource[]) => {
        let renderList: IRender = {
        }
        const keys = columns.map((item) => {
            renderList[item.key] = item
            return item.key
        })

        return dataSource.map((item: IDataSource, index: number) => {
            return <tr className={classTr +" "+ rowClassName} key={item.key}>
                {keys.map((key: string, index: number) => {
                    const tdClass = classNames("cell", "", {
                        "td-ellipsis": renderList[key].width && renderList[key].ellipsis,
                        [renderList[key].className ? renderList[key].className : "margin-cell"]: true
                    })
                    return <td className="is-leaf" key={index} style={renderList[key].width ? { width: renderList[key].width } : {}}>
                        <div className={tdClass} style={renderList[key].width ? { width: renderList[key].width, textAlign: renderList[key].algin ? renderList[key].algin : "left" } : {}}>
                            {renderList[key].render ? renderList[key].render(item[key]) : item[key]}
                        </div>
                    </td>
                })}
            </tr>
        })
    }
    
    return <div className="eda-table" style={{ width: width }}>
        <div className={classTable} style={{ width, overflowX: scroll?.x ? "auto" : "inherit" }}>
            <table className="eda-table-wrapper" style={{ ...style }} cellSpacing="0" cellPadding="0" >
                <thead className="has-gutter">
                    {renderHeader(columns)}
                </thead>
                <tbody>
                    {renderBody(dataSource)}
                </tbody>
            </table>
        </div>
        {dataSource.length === 0 ? <div className="eda-table__empty-block">
            <span className="eda-table__empty-text">
                暂无数据
                </span>
        </div> : null}
        {pagination ? <Pagination {...pagination}></Pagination> : null}

    </div>
}
export default Table