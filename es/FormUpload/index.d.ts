import type { FC } from 'react';
import type { UploadProps } from 'antd';
import type { FormItemProps } from '@ant-design/pro-form';
export declare type TFormUpload = {
    /** FormItem属性 */
    formItemProps?: FormItemProps;
    /** upload属性 */
    uploadProps?: UploadProps;
    /** 必填 */
    required?: boolean;
    /** 是否Dragger */
    isDragger: boolean;
    /** 是否视频上传 */
    isVideo?: boolean;
    /** 请求的接口 */
    uploadFileReq: (formData: any) => any;
    /** 桶名 */
    bucketName?: string;
};
declare const FormUpload: FC<TFormUpload>;
export default FormUpload;
