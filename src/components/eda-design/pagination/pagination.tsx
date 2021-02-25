import React from 'react'
import './pagination.less'
import { Icon } from './../icon/Icon';
// import { classNames } from './../utils/index';
import { useState, useEffect } from 'react';
enum MoreHandle {
    MORE = "more",
    LEFT = "d-arrow-left",
    RIGHT = "d-arrow-right"
}
export interface IPagination {
    current?: number
    defaultCurrent?: number
    defaultPageSize?: number
    pageSize?: number
    total: number
    groupCount?: number
    onChange?: (page: number, pageSize: number) => void
}
export const Pagination = (props: IPagination) => {
    const { defaultCurrent, current = 1, groupCount = 7, defaultPageSize = 20, pageSize = 20, total, onChange } = props
    let [currentPage, setCurrentPage] = useState(defaultCurrent ? defaultCurrent : current)
    //setCurrentSize
    let [currentSize, ] = useState(defaultPageSize ? defaultPageSize : pageSize)
    let [moreLeft, setMoreLeft] = useState("more")
    let [moreRight, setMoreRight] = useState("more")
    //, setPageNum
    let [pageNum, setPageNum] = useState(Math.ceil(total / currentSize))
    let [startPage, setStartPage] = useState(1)
    let [inputNum, setInputNum] = useState<string | number>(1)
    useEffect(() => {
        setPageNum(Math.ceil(total / currentSize))
    }, [total]);
    useEffect(() => {
        pageClick(current) 
    }, [current])
    // let classesPrev = classNames("", "", {})
    const moreHandle = (type: MoreHandle, value: MoreHandle) => {
        if (type === MoreHandle.LEFT) {
            setMoreLeft(value)
        } else {
            setMoreRight(value)
        }

    }
    const pageClick = (currentPage: number) => {
        setCurrentPage(currentPage)
        setInputNum(currentPage)
        if (currentPage >= groupCount) {
            setStartPage(currentPage - 2)
            // if(pageNum-currentPage<3){
            //     setStartPage(currentPage - 6)
            // }
        }
        if (currentPage < groupCount) {
            setStartPage(1)

        }
        //第一页时重新设置分组的起始页
        if (currentPage === 1) {
            setStartPage(1)
        }
        onChange && onChange(currentPage, currentSize)

    }
    const moreClick = (type: MoreHandle) => {
        if (type === MoreHandle.LEFT) {
            pageClick(currentPage - groupCount >= 1 ? currentPage - groupCount : 1)
        } else {
            pageClick(currentPage + groupCount <= pageNum ? currentPage + groupCount : pageNum)
        }
    }
    const renderNumber = () => {
        let tmpArr = Array.from(new Array(pageNum), (item, index) => {
            return index + 1
        })
        if (pageNum <= groupCount) {
            //总页码小于7
            return tmpArr.map((item) => {
                return <li key={item} onClick={() => {
                    pageClick(item)
                }} className={`number ${item === currentPage ? "active" : ""}`}>{item}</li>
            })
        } else {
            let pages = []
            pages.push(
                <li key={1} onClick={() => {
                    pageClick(1)
                }} className={`number ${1 === currentPage ? "active" : ""}`}>
                    {1}
                </li>
            )
            let pageLength = 0
            if (groupCount + startPage > pageNum) {
                pageLength = pageNum
            } else {
                pageLength = groupCount + startPage;
            }

            //前面省略号(当当前页码比分组的页码大时显示省略号)
            if (currentPage >= groupCount) {
                pages.push(<li key={MoreHandle.LEFT} className="eda-quick-prev"
                    onClick={() => {
                        moreClick(MoreHandle.LEFT)
                    }}
                    onMouseEnter={() => {
                        moreHandle(MoreHandle.LEFT, MoreHandle.LEFT)
                    }}
                    onMouseLeave={() => {
                        moreHandle(MoreHandle.LEFT, MoreHandle.MORE)
                    }}
                >
                    <Icon type="" className="more" iconType={moreLeft}></Icon>
                </li>)
            }
            //非第一页和最后一页显示
            for (let i = startPage; i < pageLength; i++) {
                if (i <= pageNum - 1 && i > 1) {
                    pages.push(
                        <li key={i} onClick={() => {
                            pageClick(i)
                        }} className={`number ${i === currentPage ? "active" : ""}`}>
                            {i}
                        </li>
                    )
                }
            }
            //后面省略号
            if (pageNum - startPage >= groupCount + 1) {
                pages.push(<li key={MoreHandle.RIGHT} className="eda-quick-next"
                    onClick={() => {
                        moreClick(MoreHandle.RIGHT)
                    }}
                    onMouseEnter={() => {
                        moreHandle(MoreHandle.RIGHT, MoreHandle.RIGHT)
                    }}
                    onMouseLeave={() => {
                        moreHandle(MoreHandle.RIGHT, MoreHandle.MORE)
                    }}>
                    <Icon type="" iconType={moreRight}></Icon>
                </li>)
            }




            pages.push(
                <li key={pageNum} onClick={() => {
                    pageClick(pageNum)
                }} className={`number ${pageNum === currentPage ? "active" : ""}`}>
                    {pageNum}
                </li>
            )
            return pages
        }
    }
    return (<div className="eda-pagination-box">
        <span className="demonstration">每页显示数量：{currentSize}</span>
        <div className="eda-pagination">
            <button type="button" onClick={() => {
                let current = currentPage - 1 > 0 ? currentPage - 1 : 0
                pageClick(current)
            }} disabled={currentPage === 1} className="btn-prev">
                <Icon type="" iconType="arrow-left"></Icon>
            </button>

            <ul className="eda-pager">
                {renderNumber()}
            </ul>
            <button type="button" onClick={() => {
                let current = currentPage + 1 > pageNum ? pageNum : currentPage + 1
                pageClick(current)
            }} disabled={currentPage === pageNum} className="btn-next">
                <Icon type="" iconType="arrow-right"></Icon>
            </button>
            <span className="eda-pagination__jump">
                前往<div className="eda-input eda-pagination__editor is-in-pagination">
                    <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        let num = event.target.value
                        setInputNum(Math.min(pageNum,Number(num)))
                    }} onBlur={() => {
                        let num = Number(inputNum) >= 1 ? Number(inputNum) : 1
                        if(num===currentPage)return setInputNum(num)
                        pageClick(num)
                    }} type="number" value={inputNum} autoComplete="off" min="1" className="eda-input__inner" max={pageNum} />
                </div>页
            </span>
        </div>
    </div>)
}
export default Pagination