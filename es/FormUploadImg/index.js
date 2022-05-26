function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message, Form } from 'antd';
import React, { useState } from 'react';

var FormUploadImg = function FormUploadImg(props) {
  var fileSize = props.fileSize,
      formItemProps = props.formItemProps,
      uploadProps = props.uploadProps,
      required = props.required,
      extraUploadFn = props.extraUploadFn,
      uploadFileReq = props.uploadFileReq;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      previewVisible = _useState2[0],
      setPreviewVisible = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      previewImage = _useState4[0],
      setPreviewImage = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      previewTitle = _useState6[0],
      setPreviewTitle = _useState6[1];
  /** 是否超出尺寸 */


  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isOutSize = _useState8[0],
      setIisOutSize = _useState8[1];

  var handleCancel = function handleCancel() {
    return setPreviewVisible(false);
  };

  var handlePreview = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
              setPreviewImage(file === null || file === void 0 ? void 0 : file.thumbUrl);
              setPreviewVisible(true);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handlePreview(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var handleUpload = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(info) {
      var file, formData, res, _res$data;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              file = info.file;

              if (!((file === null || file === void 0 ? void 0 : file.size) / 1024 < (fileSize || 0))) {
                _context2.next = 14;
                break;
              }

              formData = new FormData();
              formData.append('file', file);

              if (!extraUploadFn) {
                _context2.next = 8;
                break;
              }

              extraUploadFn({
                info: info,
                formData: formData
              });
              _context2.next = 12;
              break;

            case 8:
              _context2.next = 10;
              return uploadFileReq(formData);

            case 10:
              res = _context2.sent;

              if ((res === null || res === void 0 ? void 0 : res.code) === 200) {
                file.file_link = res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.file_link;
                setIisOutSize(false);
                info.onSuccess();
              } else {
                info.onError('上传失败');
              }

            case 12:
              _context2.next = 17;
              break;

            case 14:
              info.onError("\u56FE\u7247\u5927\u5C0F\u8D85\u51FA".concat((fileSize || 512) > 1024 ? Math.fround((fileSize || 512) / 1024) + 'M' : fileSize + 'k'));
              setIisOutSize(true);
              message.error("\u56FE\u7247\u5927\u5C0F\u8D85\u51FA".concat((fileSize || 512) > 1024 ? Math.fround((fileSize || 512) / 1024) + 'M' : fileSize + 'k'));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleUpload(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  /** 处理form.item upload问题 */


  var normFile = function normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  var uploadButton = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlusOutlined, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      color: '#00B864'
    }
  }, "\u4E0A\u4F20\u56FE\u7247"));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Form.Item, _objectSpread({
    required: required,
    label: "\u9879\u76EE\u56FE\u7247",
    rules: [{
      required: required,
      message: '请上传'
    }, function () {
      return {
        validator: function validator(_, value) {
          var _value$;

          if (isOutSize) {
            return Promise.reject(new Error("\u56FE\u7247\u8D85\u51FA".concat((fileSize || 512) > 1024 ? Math.fround((fileSize || 512) / 1024) + 'M' : fileSize + 'k')));
          }

          if (value === null || value === void 0 ? void 0 : (_value$ = value[0]) === null || _value$ === void 0 ? void 0 : _value$.error) {
            var _value$2;

            return Promise.reject(new Error(value === null || value === void 0 ? void 0 : (_value$2 = value[0]) === null || _value$2 === void 0 ? void 0 : _value$2.error));
          }

          return Promise.resolve();
        }
      };
    }],
    valuePropName: "fileList",
    getValueFromEvent: normFile,
    name: "image",
    style: {
      width: '100%'
    }
  }, formItemProps), /*#__PURE__*/React.createElement(Upload // action="http://192.168.212.115:8015/v1/upload/"
  // beforeUpload={() => false}
  , _objectSpread({
    // action="http://192.168.212.115:8015/v1/upload/"
    // beforeUpload={() => false}
    customRequest: handleUpload,
    listType: "picture-card",
    onPreview: handlePreview
  }, uploadProps), uploadButton)), /*#__PURE__*/React.createElement(Modal, {
    visible: previewVisible,
    title: previewTitle,
    footer: null,
    onCancel: handleCancel
  }, /*#__PURE__*/React.createElement("img", {
    alt: "\u5934\u50CF",
    style: {
      width: '100%'
    },
    src: previewImage
  })));
};

FormUploadImg.defaultProps = {
  fileSize: 512
};
export default FormUploadImg;