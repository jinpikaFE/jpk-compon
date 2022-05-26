export declare function toBlob(base64Data: any): Blob;
/**
 * 上传文件
 * @param {*} bucketName 桶名
 * @param {*} info info为antd上传组件的info
 * @param {*} callback 回调函数，返回下载url
 */
export declare function uploadFile(bucketName: any, info: any, callback: any): void;
export declare function checkedAndUpload(bucketName: any, info: any, callback: any): void;
