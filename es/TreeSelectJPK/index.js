function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Select, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import { toTree } from '../untils/index';

var TreeSelectJPK = function TreeSelectJPK(props) {
  var selectProps = props.selectProps,
      treeProps = props.treeProps,
      treeData = props.treeData,
      keyPropName = props.keyPropName,
      titlePropName = props.titlePropName,
      treeDataSimpleMode = props.treeDataSimpleMode,
      simpleModePropName = props.simpleModePropName,
      value = props.value;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      checkedKeys = _useState2[0],
      setCheckedKeys = _useState2[1];

  var _useState3 = useState(value || []),
      _useState4 = _slicedToArray(_useState3, 2),
      selectValue = _useState4[0],
      setSelectedValue = _useState4[1];

  var onCheck = function onCheck(checked, e) {
    var _e$halfCheckedKeys, _e$halfCheckedKeys2;

    console.log(checked, checked.concat((_e$halfCheckedKeys = e.halfCheckedKeys) === null || _e$halfCheckedKeys === void 0 ? void 0 : _e$halfCheckedKeys.map(function (item) {
      return "".concat(item, "-half");
    })));
    setSelectedValue(checked.concat((_e$halfCheckedKeys2 = e.halfCheckedKeys) === null || _e$halfCheckedKeys2 === void 0 ? void 0 : _e$halfCheckedKeys2.map(function (item) {
      return "".concat(item, "-half");
    })));
    setCheckedKeys(checked);
  };
  /** 对treeData进行加工 */


  var getTreeData = function getTreeData(trData) {
    return trData === null || trData === void 0 ? void 0 : trData.map(function (item) {
      var obj = {
        key: item === null || item === void 0 ? void 0 : item[keyPropName || 'key'],
        title: item === null || item === void 0 ? void 0 : item[titlePropName || 'title']
      };

      if (item === null || item === void 0 ? void 0 : item.children) {
        obj.children = getTreeData(item === null || item === void 0 ? void 0 : item.children);
      }

      return obj;
    });
  };

  var returnTreeData = function returnTreeData() {
    if (treeDataSimpleMode) {
      return toTree({
        data: JSON.parse(JSON.stringify(treeData)),
        key: (simpleModePropName === null || simpleModePropName === void 0 ? void 0 : simpleModePropName.id) || 'id',
        parentKey: (simpleModePropName === null || simpleModePropName === void 0 ? void 0 : simpleModePropName.pId) || 'pId',
        cb: function cb(item) {
          item.title = item === null || item === void 0 ? void 0 : item[(simpleModePropName === null || simpleModePropName === void 0 ? void 0 : simpleModePropName.title) || 'title'];
          item.key = item === null || item === void 0 ? void 0 : item[(simpleModePropName === null || simpleModePropName === void 0 ? void 0 : simpleModePropName.id) || 'id'];
          return item;
        }
      });
    }

    return keyPropName || titlePropName ? getTreeData(treeData) : treeData;
  };

  useEffect(function () {
    if (value) {
      var checked = value === null || value === void 0 ? void 0 : value.filter(function (item) {
        return !item.includes('half');
      });
      console.log(checked);
      setCheckedKeys(checked);
    }
  }, [value]);
  return /*#__PURE__*/React.createElement(Select, _objectSpread(_objectSpread({
    mode: "multiple",
    value: selectValue,
    onClear: function onClear() {
      setSelectedValue([]), setCheckedKeys([]);
    },
    allowClear: true
  }, selectProps), {}, {
    dropdownRender: function dropdownRender() {
      return /*#__PURE__*/React.createElement(Tree, _objectSpread({
        checkable: true,
        defaultExpandAll: true,
        onCheck: onCheck,
        checkedKeys: checkedKeys,
        treeData: returnTreeData()
      }, treeProps));
    }
  }));
};

export default TreeSelectJPK;