import type { FormItemProps, UploadProps } from 'antd';
import React from 'react';
export declare type TFormUploadImg = {
    /** 图片不能超过的大小 默认512 */
    fileSize?: number;
    /** FormItem属性 */
    formItemProps?: FormItemProps;
    /** upload属性 */
    uploadProps?: UploadProps;
    /** 是否必填 */
    required?: boolean;
    /** 文件上传额外处理 */
    extraUploadFn?: (obj: any) => void;
    /** 请求的接口 */
    uploadFileReq: (formData: any) => any;
};
declare const FormUploadImg: React.FC<TFormUploadImg>;
export default FormUploadImg;
