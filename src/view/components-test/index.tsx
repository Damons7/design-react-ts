import React, { useState, useEffect, useLayoutEffect } from 'react'
import sv from '../../logo.svg'
import { Link } from 'react-router-dom'
import './index.less'
import { Editor } from '@tinymce/tinymce-react';
// import Editor from "rich-markdown-editor";
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// window.tinymce.baseURL = window.location.origin + '/tinymce'
import {
  Menu, Spin, Message, Modal,
  Badge, Textarea, Switch, Alert,
  Notification,
  Avatar, MenuItem, Tabs, TabPane,
  Tooltip,
  Label,
  Breadcrumb,
  DropDown, DropDownMenu,
  Pagination,
  Table,
  SubMenu,
  Radio,
  Form,
  Upload,
  Cascader,
  EdaMenu
  , Select, Button, Icon
} from './../../components/eda-design/index';
import { Option } from './../../components/eda-design/select/option';
import Tag from './../../components/eda-design/tag/tag';
import { Input } from './../../components/eda-design/input/input';
import { postMultiple } from '@/config/axios';
// 这个函数可以把File转为datauri字符串，作为演示
function onImageUpload(file:any) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (data:any) => {
      resolve(data.target.result);
    };
    reader.readAsDataURL(file);
  });
}
const dataSource = [
  {
    key: '1',
    account: '1',
    action: ["兑换优惠卷", "操作1", "操作2"],
    time: 'time',
    integralChange: '-1',
    integralValue: '1',
  },
  {
    key: '2',
    account: '2',
    action: 32,
    time: '西湖区西湖区湖xxxxxxxxxx西湖区湖xxxxxxxxxx西湖区湖xxxxxxxxxx西湖区湖xxxxxxxxxx西湖区湖xxxxxxxxxx西湖区湖xxxxxxxxxx西湖区湖xxxxxxxxxx西湖区湖xxxxxxxxxx西湖区湖xxxxxxxxxx西湖区湖xxxxxxxxxx西湖区湖xxxxxxxxxx湖xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx底公园1号',
    integralChange: '西湖xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx区湖底公园1号',
    integralValue: '西湖区湖底公园1号',
  },
  {
    key: '3',
    account: '2',
    action: 32,
    time: '西湖区湖底公园1号',
    integralChange: '西湖区湖底公园1号',
    integralValue: '西湖区湖底公园1号',
  },
  {
    key: '4',
    account: '2',
    action: 32,
    time: '西湖区湖底公园1号',
    integralChange: '西湖区湖底公园1号',
    integralValue: '西湖区湖底公园1号',
  },
  {
    key: '5',
    account: '2',
    action: 32,
    time: '西湖区湖底公园1号',
    integralChange: '西湖区湖底公园1号',
    integralValue: '西湖区湖底公园1号',
  },
  {
    key: '6',
    account: '2',
    action: 32,
    time: '西湖区湖底公园1号',
    integralChange: '西湖区湖底公园1号',
    integralValue: '西湖区湖底公园1号',
  },
  {
    key: '7',
    account: '2',
    action: 32,
    time: '西湖区湖底公园1号',
    integralChange: '西湖区湖底公园1号',
    integralValue: '西湖区湖底公园1号',
  },
  {
    key: '8',
    account: '2',
    action: 32,
    time: '西湖区湖底公园1号',
    integralChange: '西湖区湖底公园1号',
    integralValue: '西湖区湖底公园1号',
  },
];
let option = [{
  value: 'zhinan',
  label: '指南',
  children: [{
    value: 'shejiyuanze',
    label: '设计原则',
    children: [{
      value: 'yizhi',
      label: '一致'
    }, {
      value: 'fankui',
      label: '反馈'
    }, {
      value: 'xiaolv',
      label: '效率'
    }, {
      value: 'kekong',
      label: '可控'
    }]
  }, {
    value: 'daohang',
    label: '导航',
    children: [{
      value: 'cexiangdaohang',
      label: '侧向导航'
    }, {
      value: 'dingbudaohang',
      label: '顶部导航'
    }]
  }]
}, {
  value: 'zujian',
  label: '组件',
  children: [{
    value: 'basic',
    label: 'Basic',
    children: [{
      value: 'layout',
      label: 'Layout 布局'
    }, {
      value: 'color',
      label: 'Color 色彩'
    }, {
      value: 'typography',
      label: 'Typography 字体'
    }, {
      value: 'icon',
      label: 'Icon 图标'
    }, {
      value: 'button',
      label: 'Button 按钮'
    }]
  }, {
    value: 'form',
    label: 'Form',
    children: [{
      value: 'radio',
      label: 'Radio 单选框'
    }, {
      value: 'checkbox',
      label: 'Checkbox 多选框'
    }, {
      value: 'input',
      label: 'Input 输入框'
    }, {
      value: 'input-number',
      label: 'InputNumber 计数器'
    }, {
      value: 'select',
      label: 'Select 选择器'
    }, {
      value: 'cascader',
      label: 'Cascader 级联选择器'
    }, {
      value: 'switch',
      label: 'Switch 开关'
    }, {
      value: 'slider',
      label: 'Slider 滑块'
    }, {
      value: 'time-picker',
      label: 'TimePicker 时间选择器'
    }, {
      value: 'date-picker',
      label: 'DatePicker 日期选择器'
    }, {
      value: 'datetime-picker',
      label: 'DateTimePicker 日期时间选择器'
    }, {
      value: 'upload',
      label: 'Upload 上传'
    }, {
      value: 'rate',
      label: 'Rate 评分'
    }, {
      value: 'form',
      label: 'Form 表单'
    }]
  }, {
    value: 'data',
    label: 'Data',
    children: [{
      value: 'table',
      label: 'Table 表格'
    }, {
      value: 'tag',
      label: 'Tag 标签'
    }, {
      value: 'progress',
      label: 'Progress 进度条'
    }, {
      value: 'tree',
      label: 'Tree 树形控件'
    }, {
      value: 'pagination',
      label: 'Pagination 分页'
    }, {
      value: 'badge',
      label: 'Badge 标记'
    }]
  }, {
    value: 'notice',
    label: 'Notice',
    children: [{
      value: 'alert',
      label: 'Alert 警告'
    }, {
      value: 'loading',
      label: 'Loading 加载'
    }, {
      value: 'message',
      label: 'Message 消息提示'
    }, {
      value: 'message-box',
      label: 'MessageBox 弹框'
    }, {
      value: 'notification',
      label: 'Notification 通知'
    }]
  }, {
    value: 'navigation',
    label: 'Navigation',
    children: [{
      value: 'menu',
      label: 'NavMenu 导航菜单'
    }, {
      value: 'tabs',
      label: 'Tabs 标签页'
    }, {
      value: 'breadcrumb',
      label: 'Breadcrumb 面包屑'
    }, {
      value: 'dropdown',
      label: 'Dropdown 下拉菜单'
    }, {
      value: 'steps',
      label: 'Steps 步骤条'
    }]
  }, {
    value: 'others',
    label: 'Others',
    children: [{
      value: 'dialog',
      label: 'Dialog 对话框'
    }, {
      value: 'tooltip',
      label: 'Tooltip 文字提示'
    }, {
      value: 'popover',
      label: 'Popover 弹出框'
    }, {
      value: 'card',
      label: 'Card 卡片'
    }, {
      value: 'carousel',
      label: 'Carousel 走马灯'
    }, {
      value: 'collapse',
      label: 'Collapse 折叠面板'
    }]
  }]
}, {
  value: 'ziyuan',
  label: '资源',
  children: [{
    value: 'axure',
    label: 'Axure Components'
  }, {
    value: 'sketch',
    label: 'Sketch Templates'
  }, {
    value: 'jiaohu',
    label: '组件交互文档'
  }]
}]
interface IMenu {
  title: string,
  path?: string,
  icon?: string,
  children?: IMenu[]
}
const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange(obj:any) {    
  console.log('handleEditorChange', obj)
}
export default function Test() {
  let [vis, setVis] = useState(false)
  let [spin, setSpin] = useState(false)
  let [dataList, setDataList] = useState(dataSource)
  let [placeholder, setPlaceholderContent] = useState("morenzhi");
  const [opt, setOpt] = useState([{ value: "1", content: 2 }])
  const [opts, setOpts] = useState<Array<any>>([])
  const [initFormValue, setFormValue] = useState<any>({
    work: "work",
    work1: 1,
    work2: "11",
    work3: "",
    work4: "",
    work5: "",

  })
  const columns = [
    {
      title: '序号',
      dataIndex: 'account',
      key: 'account',
      render: (item: any) => {

        return <div>{item}</div>
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      className: "xs",
      render: (items: any) => {
        return Array.isArray(items) ? items.map((item: any) => {
          return <Button size="sm" key={item} btnType="action">{item}</Button>
        }) : <Button size="sm" btnType="action">{items}</Button>
      }
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      key: 'time',
      className: "xs",
    },

    {
      title: '积分变化',
      dataIndex: 'integralChange',
      key: 'integralChange',
    },
    {
      title: '积分值',
      dataIndex: 'integralValue',
      key: 'integralValue',
    },
  ];

  const menuList: IMenu[] = [{
    title: 'title1',
    icon: "",
  }, {
    title: 'title2',
    icon: "",
    children: [{
      title: 'title3',
      icon: "",
    }]
  }]
  const renderMenus = (list: IMenu[]) => {
    return list.map((item: any) => {
      if (item.children) {
        return <EdaMenu.SubItem key={item.title} title={item.title}>
          {renderMenus(item.children)}
        </EdaMenu.SubItem>
      } else {
        return <EdaMenu.MenuItem to={item.path} key={item.title}>
          {item.title}
        </EdaMenu.MenuItem>
      }
    })

  }
  const handleEditorChange = (content: any, editor: any) => {
    console.log('Content was updated:', content);
    console.log('Content was updated:', editor);
  }
  const tinymceCDN = window.location.origin + '/tinymce/tinymce.min.js'
  return <div>
    {/* <Editor
    onChange={(e)=>{
      console.log(e);
      
    }}
  defaultValue="Hello world!"
/> */}
          <Tooltip title="ssssssssss">
            <Input
              textType="number"
              min={3}
              max={10}
              addonBefore="https://"
            ></Input>
            </Tooltip>
        <MdEditor
      style={{ height: "500px" }}
      renderHTML={(text:any) => mdParser.render(text)}
      onChange={handleEditorChange}
      onImageUpload={onImageUpload} 
    />
    <Editor
      initialValue="<p>This is the initial content of the editor</p>"
      // apiKey="wl85fiw1zxbzaxa94qwm5a9vutlzcyi5d9x84cetp8o8jcd4"
    
      init={{
        height: 300,
        base_url: window.location.origin + '/tinymce',
        document_base_url:window.location.origin + '/tinymce',
        language:'zh_CN',//注意大小写
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={handleEditorChange}
    />
    <Upload 
      multiple
      onChange={(file:any)=>{
        postMultiple("x",file)
        console.log(file)
      }}>
            <Button 
            type="submit"
      btnType="action"
      icon={<Icon type="" style={{fontSize:12}} 
      iconType="sanjiaodown"></Icon>}
      >add</Button>
    </Upload>
    <Button 
      btnType="action"
      icon={<Icon type="" style={{fontSize:12}} 
      iconType="sanjiaodown"></Icon>}
      >add</Button>
    <div style={{ margin: "50px 50px" }}>
      <Radio
        type="checkbox"
        name="group1"
        defaultValue="child" onChange={(val: any) => {
          console.log(val);
        }}>
        <Radio.Item disabled value={"child"}> child </Radio.Item>
        <Radio.Item value={"child1"}> child1 </Radio.Item>
        <Radio.Item value={"child2"}> child2 </Radio.Item>
      </Radio>

      <Radio
        type="circle"
        name="group2"
        defaultValue="child" onChange={(val: any) => {
          console.log(val);
        }}>
        <Radio.Item value={"child"}> child </Radio.Item>
        <Radio.Item value={"child1"}> child1 </Radio.Item>
        <Radio.Item value={"child2"}> child2 </Radio.Item>
      </Radio>

      <Radio
        type="button"
        name="group3"
        defaultValue="child" onChange={(val: string) => {
          console.log(val);
        }}>
        <Radio.Item value={"child"}> child </Radio.Item>
        <Radio.Item value={"child1"}> child1 </Radio.Item>
        <Radio.Item value={"child2"}> child2 </Radio.Item>
      </Radio>


      <Form
        onFinish={(data: any) => {
          console.log(data);

        }}
        onValuesChange={(obj, obj2) => {
          console.log(obj);
          console.log(obj2);

        }}
        onFinishFailed={(obj, obj2) => {
          console.log(obj);
          console.log(obj2);
        }}
        formData={initFormValue} formLabelAlign="horizontal"
        formLayout={{ labelCol: 4, wrapperCol: 6 }}>
        <div style={{ display: "flex", marginBottom: 20, justifyContent: "space-between" }} >
          <Form.Item className="w50" rules={{ required: { border: false, text: true }, message: "不用填" }} name="work" label="label" required colon>
            <Input
              addonBefore="https://"
            ></Input>
          </Form.Item>
          <Form.Item rules={{ required: { border: false, text: true }, message: "不用填" }} className="w50" name="work2" label="label" required colon>
            <Input
            ></Input>
          </Form.Item>
        </div>

        <Form.Item rules={{ required: { border: false, text: true }, message: "不用填" }} name="work3" className="form-item-test" label="labe3" required>
          <Tooltip title="ssssssssss">
            <Input
              disabled
              addonBefore="https://"
            ></Input>
          </Tooltip>
        </Form.Item>
        <Form.Item name="work4" className="form-item-test" label="评论设置">
          <Radio type="checkbox" name="comment">
            <Radio.Item value="comment">
              <span style={{ paddingLeft: 10 }}>容许评论</span>
            </Radio.Item>
            <Radio.Item value="comment1">
              <span style={{ paddingLeft: 10 }}>容许评论1</span>
            </Radio.Item>
            <Radio.Item value="comment2">
              <span style={{ paddingLeft: 10 }}>容许评论2</span>
            </Radio.Item>
          </Radio>
        </Form.Item>
        <Form.Item name="work5" className="form-item-test" label="工程评论">
          <Radio name="work5" type="circle" >
            <Radio.Item value="project">
              <span style={{ paddingLeft: 10 }}>工程评论1</span>
            </Radio.Item>
            <Radio.Item value="project1">
              <span style={{ paddingLeft: 10 }}>工程评论2</span>
            </Radio.Item>
            <Radio.Item value="project2">
              <span style={{ paddingLeft: 10 }}>工程评论3</span>
            </Radio.Item>
          </Radio>
        </Form.Item>
        <Form.Item className="form-item-test" label="工程评论">
          <span><Button type="submit">提交</Button></span>
        </Form.Item>
      </Form>

    </div>
    <div>
      <EdaMenu
        openMode="all"
        style={{ width: 232, height: 700, "backgroundColor": " #f5f5f5" }}
        defaultIndex={"0"}
        mode="vertical"
        onSelect={(index: string) => {
          console.log(index);
        }}
      // activeClass="menu-active-item"
      // hoverClass="menu-hover-item"
      >
        {renderMenus(menuList)}
        <EdaMenu.MenuItem >
        </EdaMenu.MenuItem>
      </EdaMenu>
      <EdaMenu
        openMode="all"
        style={{ width: 232, height: 700, "backgroundColor": " #f5f5f5" }}
        defaultIndex={"0"}
        mode="vertical"
        onSelect={(index: string) => {
          console.log(index);
        }}
      // activeClass="menu-active-item"
      // hoverClass="menu-hover-item"
      >
        {renderMenus(menuList)}
        <EdaMenu.MenuItem >
        </EdaMenu.MenuItem>
      </EdaMenu>
    </div>
    <Button onClick={() => [
      setOpts(option)
    ]}>opt</Button>
    <div style={{ width: 500 }}>
      <Cascader options={option}
        defaultValue={["zhinan", "shejiyuanze", "yizhi"]}
        placeholder="提示信息"
        onChange={(val: any) => {
          console.log(val);
        }}
      ></Cascader></div>
    <div style={{ width: 500 }}>
      <Table
        stripe={false}
        scroll={
          { x: true }
        }
        pagination={{

          total: 400, defaultPageSize: 50, onChange: (page, pageSize) => {
            let data = dataSource.filter((item, index) => {
              if ((index >= (page - 1) * pageSize) && (index < (page) * pageSize)) {
                return true
              } else {
                return false
              }
            })
            console.log(data);
            setDataList(data)

          }
        }} columns={columns} dataSource={dataList}>
      </Table>
    </div>
    <Icon type="" style={{ color: 'red' }} iconType="zhengque"></Icon>
    <Pagination total={400} onChange={(page, pageSize) => {
      console.log(page, pageSize);

    }}></Pagination>
    <Breadcrumb>
      <Breadcrumb.Item to="/aaa">Ant Design</Breadcrumb.Item>
      <Breadcrumb.Item to="/aaa">Component</Breadcrumb.Item>
      <Breadcrumb.Item>General</Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ width: 500 }}>
      <Label name={"bitian"} required>
        <Input
          addonBefore="https://"
        ></Input>
      </Label>
      <Label name={"bitian"} required>
        <Tooltip title="不能为空">
          <Input
            addonBefore="https://"
          ></Input>
        </Tooltip>
      </Label>
      <Tooltip title="不不能为空不能为空不能为空不能为空不能为空不能为空不能为空能为空">
        <Input
          addonBefore="https://"
        ></Input>
      </Tooltip>
      <div style={{ margin: 50 }}></div>
      <Label width={75} name="玄天:"
        position="left" >
        <Input></Input>
      </Label>
    </div>
    <Button size="ssm">smm</Button>
    <Button btnType="warning" size="ssm">smm</Button>
    <Button btnType="success" size="ssm">smm</Button>
    <Button onClick={() => {
      setPlaceholderContent("自己改变")
      Notification
        .open({
          message: "error" + Math.random(),

          type: "error",
          duration: 3
        })
    }}>
      notify
            </Button>
    <Button onClick={() => {
      Notification.open({
        message: "success" + Math.random(),
        type: "success",
        close: true
      })

    }}>
      notify
            </Button>
    <style>

    </style>


    <DropDown overlay={<DropDownMenu>
      1111111
              <p>111</p>
    </DropDownMenu>}>
      下拉列表
          </DropDown>
    <DropDown type="click" position="left" overlay={<DropDownMenu>
      1111111
              <p>111</p>
    </DropDownMenu>}>
      下拉列表
          </DropDown>
    <DropDown position="right" overlay={<DropDownMenu>
      1111111
              <p>111</p>
    </DropDownMenu>}>
      下拉列表
          </DropDown>
    <div style={{ marginTop: 50, marginLeft: 200 }}>

      <Tag edit blur={(val) => {
        console.log(val);
      }} >+技能</Tag>


      <Tag type="danger">tag1</Tag>
      <Tag type="info" closable>tag1</Tag>
      <Tag type="success">tag1</Tag>
      <Tag type="warning">tag1</Tag>

    </div>

    <div style={{ marginTop: 50 }}></div>
    <Alert title="警告"
      type="error"
      showIcon
      message="删除账号前请先解散或转移你的团队和工程。 该操作不可恢复！删除账号仅对立创EDA上的账号与数据进行删除， 如果需要删除立创商城/嘉立创账号请联系立创商城或嘉立创。"></Alert>

    <Alert
      type="error"
      showIcon
      close
      message="当前账号尚未激活邮箱，无法开启邮件提醒功能"></Alert>
    <Message
      close
      message="当前账号尚未当前账号尚未激活邮箱当前账号尚未激活邮箱当前账号尚未激活邮箱当前账号尚未激活邮箱当前账号尚未激活邮箱当前账号尚未激活邮箱当前账号尚未激活邮箱激活邮箱"></Message>
    <Message
      message="当前账号尚未当前账号箱"></Message>
    <Message
      type="error"
      close message="当前账号尚未当前账号箱"></Message>
    <Message

      type="success"
      close message="当前账号尚未当前账号箱"></Message>
    <Alert title="提醒"
      type="warning"
      showIcon
      close
      message="当前账号尚未激活邮箱，无法开启邮件提醒功能"></Alert>
    <Button size="sm" btnType="action">开启</Button>
    <Button style={{ zIndex: 9999 }} onClick={() => {
      if (vis) {
        setVis(false)


      } else {
        console.log(vis);
        setVis(true)
      }
    }}>显示隐藏</Button>
    <Button style={{ zIndex: 9999 }} onClick={() => {
      if (spin) {
        setSpin(false)
      } else {
        console.log(vis);
        setSpin(true)
      }
    }}>Spin</Button>
    <div style={{ marginBottom: 50 }}></div>

    <div className="">
      <Spin spinning={true} ></Spin>
    </div>
    <Spin spinning={spin} tip="loading...">
      <div data-show="true" className="eda-alert ant-alert-info ant-alert-with-description ant-alert-no-icon" role="alert">
        <div className="ant-alert-content">
          <div className="ant-alert-message">
            Alert message title</div>
          <div className="ant-alert-description">
            Further details about the context of this alert.
                        </div>
        </div>
      </div>
    </Spin>
    <div style={{ marginBottom: 50 }}></div>
    <Modal visible={vis}
      className="modal-big"
      showClose
      title="吴迪" onOk={() => {
        console.log("ok");
        setVis(false)
      }}
      onCancel={() => {
        setVis(false)
        console.log("onCancel");
      }} >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
    <Badge count={5} overflowCount={99}>
      <Avatar href={sv} border="true" size="ssm"></Avatar>
    </Badge>
    <Badge count={50}>
      <Avatar href={sv} size="lg"></Avatar>
    </Badge>


    <div style={{ marginBottom: 50 }}></div>
    <Avatar href={sv} border="true" size="lg"></Avatar>
    <Avatar href="https://image.lceda.cn/avatars/2020/10/e36x5ZmcEpm2ibm91N30rs2CZoHeGz8Ew0eR6dKD.jpeg"></Avatar>

    <Textarea
      showTip

      resize={false}
      value="默认值"
      placeholder="请输入"></Textarea>
    <Input showTip className="my" placeholder="name" onChangeInput={(val: string) => {
      console.log(val);
    }}></Input>

    <Switch disabled defaultChecked></Switch>
    <Switch defaultChecked onChange={(checked) => {
      console.log(checked);

    }}></Switch>


    <div style={{ width: 300 }}>

      <Select defaultValue="青玄1"
        placeholder={placeholder}
        onInput={(val) => {
          console.log(val);
          let opts = opt.concat([{ value: val, content: val }])
          setOpt(opts)

        }}
        suffix={<Icon type="" iconType="edit1"></Icon>}
        onChange={(value: string) => {
          console.log(value);
        }}>
        {opt.map((item) => {
          return <Option key={item.value} value={item.value}>{item.content}</Option>
        })}

      </Select>

      <Select defaultValue="青玄1"
        placeholder={placeholder}
        onChange={(value: string) => {
          console.log(value);
        }}>
        <Option value="青玄">青玄title</Option>
        <Option value="name1">name1青玄title</Option>
        <Option value="name2">name2title</Option>
        <Option value="name3">name3title</Option>
        <Option value="name4">name4title</Option>
      </Select>
    </div>
    {/* <Menu
            defaultIndex={"0"}
            defaultOpenSubMenus={["1"]}
            mode="vertical"
            onSelect={(index: string) => {
                console.log(index);

            }}
        >
            <Menu.MenuItem>1</Menu.MenuItem>
            <MenuItem>xxx2</MenuItem>
            <MenuItem>xxx3</MenuItem>
        </Menu> */}
    <Tabs defaultActiveKey="0" onChange={(t: string) => { }}>
      <TabPane className="name" tab="Tab 1" key="1">
        Content of Tab Pane 1
                    </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
                    </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
                    </TabPane>
    </Tabs>


  </div>
}


