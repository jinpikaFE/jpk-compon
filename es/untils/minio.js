import moment from 'moment'; // 上传文件需要的配置

import * as Minio from 'minio';
import * as stream from 'stream'; // 你的minio配置信息

var minioClient = new Minio.Client({
  endPoint: 'minio.aimed.cn',
  //   port: 9000,
  useSSL: true,
  accessKey: 'TtXXdBZqdc',
  secretKey: 'wPcRc1GOqEcIK8t7MCU0XvVK0t3MXZEeWaqUsOAB' //   bucketName: 'xs-szhpt'

}); // base64转blob

export function toBlob(base64Data) {
  var byteString = base64Data;

  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1]); // base64 解码
  } else {
    byteString = unescape(base64Data.split(',')[1]);
  } // 获取文件类型


  var mimeString = base64Data.split(';')[0].split(':')[1]; // mime类型
  // ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区
  // let arrayBuffer = new ArrayBuffer(byteString.length) // 创建缓冲数组
  // let uintArr = new Uint8Array(arrayBuffer) // 创建视图

  var uintArr = new Uint8Array(byteString.length); // 创建视图

  for (var i = 0; i < byteString.length; i += 1) {
    uintArr[i] = byteString.charCodeAt(i);
  } // 生成blob


  var blob = new Blob([uintArr], {
    type: mimeString
  }); // 使用 Blob 创建一个指向类型化数组的URL, URL.createObjectURL是new Blob文件的方法,可以生成一个普通的url,可以直接使用,比如用在img.src上

  return blob;
}
/**
 * 上传文件
 * @param {*} bucketName 桶名
 * @param {*} info info为antd上传组件的info
 * @param {*} callback 回调函数，返回下载url
 */

export function uploadFile(bucketName, info, callback) {
  // 获取文件类型及大小
  var fileName = "".concat(moment().format('YYYY-MM-DD'), "/").concat(info.file.name);
  var mineType = info.file.type;
  var fileSize = info.file.size; // 参数

  var metadata = {
    'content-type': mineType,
    'content-length': fileSize
  }; // 将文件转换为minio可接收的格式

  var reader = new FileReader();
  reader.readAsDataURL(info.file);

  reader.onloadend = function (e) {
    var dataurl = e.target.result; // base64转blob

    var blob = toBlob(dataurl); // blob转arrayBuffer

    var reader2 = new FileReader();
    reader2.readAsArrayBuffer(blob);

    reader2.onload = function (ex) {
      // 定义流
      var bufferStream = new stream.PassThrough(); // 将buffer写入

      bufferStream.end(Buffer.from(ex.target.result)); // 上传

      minioClient.putObject(bucketName, fileName, bufferStream, fileSize, metadata, function (err) {
        if (err == null) {
          // 获取可下载的url
          minioClient.presignedGetObject(bucketName, fileName, 24 * 60 * 60, function (err1, presignedUrl) {
            if (err1) return; // 将数据返回

            callback(presignedUrl);
          });
        }
      });
    };
  };
} // 先判断桶是否存在, 如果可确保桶已经存在，则直接调用upload方法

export function checkedAndUpload(bucketName, info, callback) {
  minioClient.bucketExists(bucketName, function (err) {
    if (err) {
      minioClient.makeBucket(bucketName, 'us-east-1', function (err1) {
        if (err1) {
          console.error("".concat(info.file.name, "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25"));
          return;
        }

        uploadFile(bucketName, info, callback);
      });
    } else {
      uploadFile(bucketName, info, callback);
    }
  });
}