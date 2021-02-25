import React from 'react'
import { Link } from 'react-router-dom';
import './header.less'
import { Menu } from './../../components/eda-design/menu/menu';
import SubMenu from './../../components/eda-design/menu/subMenu';
import MenuItem from './../../components/eda-design/menu/menuItem';
import { Icon } from './../../components/eda-design/icon/Icon';
import Avatar from './../../components/eda-design/avatar/avatar';
import { DropDownMenu } from './../../components/eda-design/dropdown/dropdownMenu';
import { DropDown } from './../../components/eda-design/dropdown/dropdown';

export default function Header(){
    return <header className="header">
            <div className="nav-left">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA8CAYAAADxJz2MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNzY5NDdmZi1lNzRjLTM4NGMtYTgwOC02MmRlOWVjMTc2NWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzEzMTVCOTVGMDY3MTFFNzhGRUI4RkU4NjBFN0M2RkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzEzMTVCOTRGMDY3MTFFNzhGRUI4RkU4NjBFN0M2RkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OWIzMjMxY2MtOTAwNi1iZTQyLWJjZDEtMWYyYTM3MTJlZDc0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MWQ4ZTg2NWQtZTUzMS0xMWU3LWE1YmYtZGM0MzJlYWFmYmE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+b18ZAAAABTxJREFUeNrsm2toFUcUxzfGxkdiora+qDUaY60UpYqvYm0sTbVUJQq2VbABK5aiKKIWrSLqlz6gtNBKCza1xIooStTWJyJKFfVDoxgfsVVblaRRNCHxkTSKuf2fe4/lsp3Znd27mV1xDvzY3N2d3dn/ztk5c2aSFovFLGP+rY2RwAhoBDQCGgGNGQGNgEZAI6AxI6B2a+u3YENTYpvToVXq9QKYCMaAwaAPyOBjjeAvcAYcAT+DqrAETPM7Fn55Q218e7z46SC94W2wCIz0WPYA+BLse1JdeDQoB5t9iEf2BtgLDnPrjX4LPHL1QXw7NveplO4PVoJVAb7MZjAP/BDpFlhx80GcFIy+aZvAmoA9oR0oAZ9GuhPZeD7Ri8wb3tFvyysF0x3OuQ22sVueBzd4fzcwBBSCKSBLUn4ZaAErIimgB8vlB34WtGdhhjqIV88uTS54T3CcetxT/AKywQIWK1Nw7nJwAfzUak9H30A/zNnTYI0uvSU73gd8Aq7EvNkh0MNHffqBcsk1G0Ffv8/phu9vT49MYdFO4CtwGXzMrU/VtoAJSa7qxSguHAsOCY5RpPpN5DqR/M7/8/7B7FoLfXwaKCAuBvdTeBYKsIvAOcGxSWBEpATMy0lP/jkKHAX9fT74eymK98ju8LUeCo5Rr/xcdATs8l8jy+cgNtvh9Jvcynaym9UlHfsCXA3wmcgLfhTsfx1cAVtBv9A7kfrG+LYtOOnQKfwCXgFtbOXp92tgl89Ow40XXTqrJvB+EPdKVcD5kgreAUWt1fMpckGh118TmoAgA9QIKtUMxoQsHrFeMXT6IJX7pKWwMmEqKJOMAD6PQIKiJ6fBiMlgBhAN3Js4gris9RsISgRvsxq0j0DrE5HvEGxv0x5Ic+hiN+rh/olo8vgSKKA8iMSbcrWGMbDnJQGx9qSwQ0LBbnc5YI8JdCjSLWCGYF+1ZvHeAic5LaZqpzmDbbeCKGSkszUJR6msE2A3eIk7iTc9lD8s2Ndbt4A1gn0DPJTvDoZxqqurYpkCfvgDgm/w1xKvENl1wb5ndAsoGrS7fUeyOIVfyVmXcnapWnbF+RIRaM5kH4snczV6eYtUk0mSPKTWMGapJCQYKjm/ENxQCGwvJV2DtjsVA2IqN02x7vsF5ct0j0TyQIugIr8JYsGJ4L6HxCoNBQ8qnnsNzOJxuUq9h0jqvTiMsXCZ5KF2gA58bi/QEAve/gYf8pBStd6dQIXgWi3cILQLOJDHviKjLM1wsM7F7a55FO46WJj0glQZ4DAS2aF9LJy0tGMx5/RkRsnNdNu+i1ZiFcJp/j2OQxKnKb5avs9aDojt1pXDG+qcGnhfOucraZnIu5IOqpknuSq1diKVv/8ZB3/TSyj10ILIXQYJrlkkOf82WA2yHeoznXN8fmxuKOmsqpq6OPw7HXyvWOEKyTXTeAbNboUudWnHIvuxz0KblcvK6RInyU3nMHddimY6zFGL6lPncr1uPBvoxcht53LqLZw5EYmVcJLhW54sEk6ngPGC/bOsxLIMu7nNl1RJMizCLxbYzqOf70KfE+GeWAZ9s2ZK3JLCmtkgB3QHSyRx4gnF+vTlgLuRr0MuXc/8wXMzH/EEfKB5xiB6YTejZRqrfb7f4lZdlhFELk2DgJnsYnkeb3HMSqw2aImygDoWWN7jJMMtD2VofuKdqIunS0Cys1Zi5emvCudu5+xLtfUYmA4XthslPmn5xaugF7cy6kkPgvXguPUYWSrTmsYs838iRkAjoBHQCGjMCGgENAIaAY0ZAcOwfwUYAAN+JmNYsmqsAAAAAElFTkSuQmCC" alt="logo"></img>
              <div  className="normal">
            <Menu
            defaultIndex={"0"}
            defaultOpenSubMenus={["1"]}
            mode="horizontal"
            onSelect={(index: string) => {
              console.log(index);
            }}
          >
            <SubMenu title="产品">
              <MenuItem>在线编辑器</MenuItem>
              <MenuItem>桌面客户端</MenuItem>
              <MenuItem>教育版</MenuItem>
            </SubMenu>
            <SubMenu title="价格">
            </SubMenu>
            <SubMenu title="服务">
              <MenuItem>
              <Link target="_blink" to="/user/account/test">
              元件购买 - 立创商城
                </Link>
              </MenuItem>
              <MenuItem>PCB定制 - 嘉立创</MenuItem>
            </SubMenu>
            <MenuItem>广场</MenuItem>
            
            <SubMenu title="帮助">
              <MenuItem>用户论坛</MenuItem>
              <MenuItem>使用教程</MenuItem>
              <MenuItem>更新记录</MenuItem>
              <MenuItem>联系我们</MenuItem>
            </SubMenu>
          </Menu>
            </div>
              <div className="editor-div">
                <div className="editor-btn"><span  className="editor-span">编辑器</span></div>
                </div>
            </div>
            <div className="nav-right">
              <div className="nav-search">
              <Icon type="nc-u-search"></Icon>
              </div>
              <DropDown overlay={<DropDownMenu className="drop-menu">
              1111111
              <p>111</p>
          </DropDownMenu>}>
          <div className="nav-notify">
                    <span><Icon type="nc-u-notice-header"></Icon></span>
                    <Avatar size="sm" href="https://image.lceda.cn/avatars/2020/10/e36x5ZmcEpm2ibm91N30rs2CZoHeGz8Ew0eR6dKD.jpeg"></Avatar>
              </div>
          </DropDown>

            </div>
    </header>
}