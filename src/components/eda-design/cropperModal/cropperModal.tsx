import React, { useState, useEffect, useCallback, useRef } from 'react'
import Button from '../button/button'
import Cropper from 'react-cropper' // 引入Cropper
import 'cropperjs/dist/cropper.css' // 引入Cropper对应的css

import './cropperModal.less'

export function HooksCropperModal({ uploadedImageFile, onClose, onSubmit }: any) {
  const [src, setSrc] = useState('')
  const cropperRef = useRef(null)

  useEffect(() => {
    const fileReader = new FileReader()
    fileReader.onload = e => {
      const dataURL = e.target && e.target.result
      setSrc(dataURL as string)
    }
    fileReader.readAsDataURL(uploadedImageFile)

  }, [uploadedImageFile])

  const handleSubmit = useCallback(() => {
    // let filename = uploadedImageFile.name
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    // TODO: 这里可以尝试修改上传图片的尺寸
    if (cropper.getCroppedCanvas) {
      let base64 = cropper.getCroppedCanvas().toDataURL()
      cropper.getCroppedCanvas().toBlob(async (blob: any) => {
        //把选中裁切好的的图片传出去
        onSubmit(base64,blob)
        // 关闭弹窗
        onClose()
      })
    }

  }, [onSubmit, onClose])
  //拖动回调 
  // const onCrop = () => {
  //   const imageElement: any = cropperRef?.current;
  //   const cropper: any = imageElement?.cropper;
  //   console.log(cropper.getCroppedCanvas().toDataURL());
  // };
  return (
    <div className="hooks-cropper-modal">
      <div className="modal-panel">
        <div className="cropper-container-container">
          <div className="cropper-container">
            <Cropper
              src={src}
              className="cropper"
              ref={cropperRef}
              // crop={onCrop}
              // Cropper.js options
              viewMode={1}
              zoomable={false}
              aspectRatio={1} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
              guides={false}
              preview=".cropper-preview"
            />
          </div>
          <div className="preview-container">
            <div className="cropper-preview" />
          </div>
        </div>
        <div className="button-row">
          <Button className="submit-button" btnType="success" onClick={handleSubmit}>提交</Button>
          <Button className="submit-button" btnType="danger" onClick={() => {
            onClose && onClose()
          }}>取消</Button>
        </div>
      </div>
    </div>
  )
}

// HooksCropperModal.propTypes = {
//   uploadedImageFile: PropTypes.object.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired
// }

export default HooksCropperModal
