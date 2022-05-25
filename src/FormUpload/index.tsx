import React from 'react';
import type { FC } from 'react';
import type { UploadProps } from 'antd';
import { message } from 'antd';
import { Form, Upload } from 'antd';
import type { FormItemProps } from '@ant-design/pro-form';
import { checkedAndUpload } from '../untils/minio';
import { useUpdate } from 'ahooks';

export type TFormUpload = {
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

const FormUpload: FC<TFormUpload> = (props) => {
  const { formItemProps, required, uploadProps, isDragger, isVideo, uploadFileReq, bucketName } =
    props;
  let timer: any = null;
  const update = useUpdate();

  /** 处理form.item valuePropName问题 */
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e?.fileList;
  };

  const onChange = (info: any) => {
    if (isVideo) {
      const { file } = info;
      file.percent = 0;
      if (file?.status === 'uploading') {
        timer = setInterval(() => {
          if (file.percent === 85 && timer) {
            clearInterval(timer);
          }
          file.percent += 1;
          update();
        }, 5000);
      }
      if (file?.status === 'done') {
        file.percent = 100;
      }
    }
  };

  const handleUpload = async (info: any) => {
    const { file } = info;

    const formData = new FormData();
    formData.append('file', file);
    if (isVideo) {
      checkedAndUpload(bucketName, info, (res: string) => {
        if (timer) {
          clearInterval(timer);
        }
        file.file_link = res;
        message.success('上传成功');
        info.onSuccess();
      });
    } else {
      const res = await uploadFileReq(formData);
      if (res?.code === 200) {
        file.file_link = res?.data?.file_link;
        info.onSuccess();
      } else {
        info.onError('上传失败');
      }
    }
  };

  return (
    <Form.Item
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={[
        { required: required, message: '请上传' },
        () => ({
          validator(_, value) {
            if (value?.[0]?.error) {
              return Promise.reject(new Error(value?.[0]?.error));
            }
            return Promise.resolve();
          },
        }),
      ]}
      required={required}
      {...formItemProps}
    >
      {isDragger ? (
        <Upload.Dragger
          customRequest={handleUpload}
          maxCount={1}
          {...uploadProps}
          onChange={onChange}
        />
      ) : (
        <Upload customRequest={handleUpload} maxCount={1} {...uploadProps} />
      )}
    </Form.Item>
  );
};

export default FormUpload;
