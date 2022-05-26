function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from 'react';
import { message } from 'antd';
import { Form, Upload } from 'antd';
import { checkedAndUpload } from '../untils/minio';
import { useUpdate } from 'ahooks';

var FormUpload = function FormUpload(props) {
  var formItemProps = props.formItemProps,
      required = props.required,
      uploadProps = props.uploadProps,
      isDragger = props.isDragger,
      isVideo = props.isVideo,
      uploadFileReq = props.uploadFileReq,
      bucketName = props.bucketName;
  var timer = null;
  var update = useUpdate();
  /** 处理form.item valuePropName问题 */

  var normFile = function normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }

    return e && (e === null || e === void 0 ? void 0 : e.fileList);
  };

  var onChange = function onChange(info) {
    if (isVideo) {
      var file = info.file;
      file.percent = 0;

      if ((file === null || file === void 0 ? void 0 : file.status) === 'uploading') {
        timer = setInterval(function () {
          if (file.percent === 85 && timer) {
            clearInterval(timer);
          }

          file.percent += 1;
          update();
        }, 5000);
      }

      if ((file === null || file === void 0 ? void 0 : file.status) === 'done') {
        file.percent = 100;
      }
    }
  };

  var handleUpload = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(info) {
      var file, formData, res, _res$data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              file = info.file;
              formData = new FormData();
              formData.append('file', file);

              if (!isVideo) {
                _context.next = 7;
                break;
              }

              checkedAndUpload(bucketName, info, function (res) {
                if (timer) {
                  clearInterval(timer);
                }

                file.file_link = res;
                message.success('上传成功');
                info.onSuccess();
              });
              _context.next = 11;
              break;

            case 7:
              _context.next = 9;
              return uploadFileReq(formData);

            case 9:
              res = _context.sent;

              if ((res === null || res === void 0 ? void 0 : res.code) === 200) {
                file.file_link = res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.file_link;
                info.onSuccess();
              } else {
                info.onError('上传失败');
              }

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleUpload(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/React.createElement(Form.Item, _objectSpread({
    valuePropName: "fileList",
    getValueFromEvent: normFile,
    rules: [{
      required: required,
      message: '请上传'
    }, function () {
      return {
        validator: function validator(_, value) {
          var _value$;

          if (value === null || value === void 0 ? void 0 : (_value$ = value[0]) === null || _value$ === void 0 ? void 0 : _value$.error) {
            var _value$2;

            return Promise.reject(new Error(value === null || value === void 0 ? void 0 : (_value$2 = value[0]) === null || _value$2 === void 0 ? void 0 : _value$2.error));
          }

          return Promise.resolve();
        }
      };
    }],
    required: required
  }, formItemProps), isDragger ? /*#__PURE__*/React.createElement(Upload.Dragger, _objectSpread(_objectSpread({
    customRequest: handleUpload,
    maxCount: 1
  }, uploadProps), {}, {
    onChange: onChange
  })) : /*#__PURE__*/React.createElement(Upload, _objectSpread({
    customRequest: handleUpload,
    maxCount: 1
  }, uploadProps)));
};

export default FormUpload;