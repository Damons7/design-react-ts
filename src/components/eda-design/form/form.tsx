import React from 'react'
import './form.less'
import { IFormItem, FormItem } from './formItem';
import { useState, useEffect } from 'react';


interface IFormContext {
    formLabelAlign: string;
    formLayout: {
        labelCol?: number,
        wrapperCol?: number
    };
    formData?: any,
    validate?: any,
    onChange?:(key:string, value:string)=>void
    validateList?:Array<string>
    pushValList?:(key:string)=>void
    

}

export const FormContext = React.createContext<IFormContext>({
    formLabelAlign: "",
    formLayout: {

    }
    
})
interface ParentForm extends React.FC<IForm> {
    Item: React.FC<IFormItem>;

}

interface IForm {
    children?: React.ReactNode
    className?: string,
    formLayout?: {
        labelCol: number,
        wrapperCol: number
    };
    formLabelAlign?: string
    onValuesChange?: (changedValues: any, allValues: any) => void
    formData?: any
    onFinish?:(data:any)=>void;
    onFinishFailed?:(keyVal: any, allValues?: any)=>void
    

}
const createObjForArr = (arr:string[]) => {
    let obj:{[key:string]:boolean} = {}
    arr.forEach((item:string)=>{
        obj[item] = false
    })
    return  obj
} 
export const Form: ParentForm = (props) => {
    const { className,onFinishFailed, onValuesChange,onFinish, formData, formLabelAlign, formLayout = {}, children } = props
    const [data, setData] = useState(formData)
    const [list, setList] = useState<string[]>([])
    const [validate, setValidate] = useState(createObjForArr(Object.keys(formData)))

    useEffect(() => {
        setData(formData)
    }, [formData]);
    const inputChange = (key:string, value:string)=>{
        const newData = { ...data }
        newData[key] = value
        setData(newData)
        onValuesChange && onValuesChange({
            [key]: value
        }, newData)
    }
    const pushList = (val:string)=>{
        list.push(val)
    }
    const formContext = {
        formLayout: formLayout,
        formData: data,
        formLabelAlign: formLabelAlign ? formLabelAlign : "horizontal",
        onChange:inputChange,
        validate,
        pushValList:pushList
    }
    const submit = ()=>{
        let newValidate:{[key:string]:boolean} = {}
        list.forEach((item:string)=>{
                newValidate[item] = !data[item]
        })
        setValidate(newValidate)
        let flag = Object.keys(newValidate).every((item:string)=>{
            return !newValidate[item]
        })
        flag&&onFinish&&onFinish(data)
        newValidate = {...newValidate}
        list.forEach((item:string)=>{
                newValidate[item] = !newValidate[item]
        })

        !flag&&onFinishFailed&&onFinishFailed(newValidate,data)

    }
    const changeHandle = (e: any) => {
        const name = e.target && e.target.name
        const type = e.target.type
        if (!name||type==="checkbox"||type==="radio") return
        const value = e.target.value
        const newData = { ...data }
        switch (type) {
            default:
                newData[name] = value
        }
        setData(newData)
        onValuesChange && onValuesChange({
            [name]: value
        }, newData)
    }
    return (
        <FormContext.Provider value={formContext}>
            <div className="eda-form-wrap">
                <form
                    onChange={changeHandle}
                    onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{
                        e.stopPropagation()
                        e.preventDefault()
                        submit()
                    }}
                >
                    {children}
                </form>
            </div>
        </FormContext.Provider>

    )

}
Form.Item = FormItem
export default Form