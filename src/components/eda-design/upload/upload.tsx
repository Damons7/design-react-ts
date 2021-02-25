import React, { useState, useEffect, useRef } from 'react';
import './upload.less'
import HooksCropperModal from '../cropperModal/cropperModal';
import { post, postMultiple } from '@/config/axios';
type uploadType = "image" | "*"
type resultType = "base64" | "file" | "formData"
interface IUpload {
    className?: string;
    children?: React.ReactNode,
    uploadUrl?: string,
    resultType?: resultType
    accept?: string
    multiple?: boolean
    uploadType?: uploadType
    onChange?: (file: File | FormData | string, fileList?: FileList) => void

}
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 文件最大限制为5M
export const Upload = (props: IUpload) => {
    const { className, resultType = "formData", uploadType = "image", multiple, accept = "image/jpeg,image/jpg,image/png", onChange, uploadUrl, children } = props
    const [hooksResultImgUrl, setHooksResultImgUrl] = useState("")
    const [hooksModalFile, setHooksModalFile] = useState<File>()
    const [hooksModalVisible, setHooksModalVisible] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const handleHooksFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        inputRef && inputRef.current&& (inputRef.current.value="")
        if (file && uploadType === "image") {
            if (file?.type.startsWith(uploadType)) {
                if (file.size <= MAX_FILE_SIZE) {
                    setHooksModalFile(file)
                } else {
                    console.log('文件过大')
                }
                return
            } else {
                alert("请选择图片")
            }

        }
        if (file && uploadType === "*") {
            const formData = new FormData()
            formData.append('files', file, file.name)
            if (resultType === "formData") {
                onChange && onChange(formData)
            }
            if (resultType === "file") {
                onChange && onChange(file)
            }
        }
        
    }
    useEffect(() => {
        hooksModalFile && setHooksModalVisible(true)
    }, [hooksModalFile])
    const handleGetResultImgUrl = (key: string) => (base64: string, blob: any) => {
        let newFile = hooksModalFile!
        // 添加要上传的文件\
        const formData = new FormData()
        formData.append('files', blob, newFile.name)
        const str = URL.createObjectURL(blob)
        setHooksResultImgUrl(str)
        if (resultType === "formData") {
            onChange && onChange(formData)
        }
        if (resultType === "base64") {
            onChange && onChange(base64)
        }
    }
    return (
        <div className="half-area">

            <label onClick={() => {
                inputRef && inputRef.current?.click()
            }} className="upload-input-label" htmlFor="xFile">
                {children}
                <input
                    ref={inputRef}
                    type="file"
                    name="xFile"
                    id="xFile"
                    multiple={multiple}
                    accept={accept}
                    className="base-upload-input"
                    // onInput={handleHooksFileChange}
                    onChange={handleHooksFileChange}
                />
            </label>
            {hooksModalVisible && (
                <HooksCropperModal

                    uploadedImageFile={hooksModalFile}
                    onClose={() => {
                        setHooksModalVisible(false)
                    }}
                    onSubmit={
                        handleGetResultImgUrl('hooksResultImgUrl')
                    }
                />
            )}
        </div>)
}

export default Upload