function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect, useState } from 'react';
import { Divider, Pagination, Space } from 'antd';
import { ProFormSelect } from '@ant-design/pro-form';
import { useDebounceFn, useSetState } from 'ahooks';

var FormSelectPage = function FormSelectPage(props) {
  var proFormSelectProps = props.proFormSelectProps,
      fieldProps = props.fieldProps,
      extraPageProps = props.extraPageProps,
      asyncGetList = props.asyncGetList;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchVal = _useState2[0],
      setSearchVal = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      options = _useState4[0],
      setOptions = _useState4[1];
  /** 分页属性 */


  var _useSetState = useSetState(_objectSpread({
    current: 1,
    total: 0,
    pageSize: 20,
    pageSizeOptions: [20, 50, 100, 500],
    // showSizeChanger: true,
    showTotal: function showTotal(total) {
      return "\u603B\u5171 ".concat(total, " \u9879");
    },
    // pageSizeOptions: [11],
    size: 'small'
  }, extraPageProps)),
      _useSetState2 = _slicedToArray(_useSetState, 2),
      pageProps = _useSetState2[0],
      setPageProps = _useSetState2[1];

  var _useDebounceFn = useDebounceFn(function (val) {
    setPageProps({
      current: 1
    });
    setSearchVal(val);
  }, {
    wait: 500
  }),
      run = _useDebounceFn.run;

  var onPageChange = function onPageChange(current, pageSize) {
    setPageProps({
      current: current,
      pageSize: pageSize
    });
  };

  useEffect(function () {
    asyncGetList(setPageProps, setOptions, pageProps);
  }, [pageProps.current, pageProps.pageSize, searchVal]);
  return /*#__PURE__*/React.createElement(ProFormSelect, _objectSpread({
    mode: "multiple",
    showSearch: true,
    // width="md"
    name: "hospitals",
    label: "\u533B\u9662\u540D\u79F0",
    placeholder: "\u8BF7\u9009\u62E9\u533B\u9662",
    rules: [{
      required: true,
      message: '请选择医院'
    }],
    options: options,
    fieldProps: _objectSpread({
      dropdownRender: function dropdownRender(menu) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, menu, /*#__PURE__*/React.createElement(Divider, {
          style: {
            margin: '8px 0'
          }
        }), /*#__PURE__*/React.createElement(Space, {
          align: "center",
          style: {
            padding: '0 8px 4px'
          }
        }, /*#__PURE__*/React.createElement(Pagination, _objectSpread(_objectSpread({}, pageProps), {}, {
          onChange: onPageChange
        }))));
      },
      onSearch: function onSearch(value) {
        run(value);
      }
    }, fieldProps)
  }, proFormSelectProps));
};

export default FormSelectPage;