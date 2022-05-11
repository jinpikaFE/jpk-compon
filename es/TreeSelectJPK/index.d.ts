import { SelectProps, TreeProps } from 'antd';
import { FC } from 'react';
export declare type TreeSelectJPKProps = {
    treeData: any;
    /** select属性 */
    selectProps?: SelectProps;
    /** tree属性 */
    treeProps?: TreeProps;
    /** key对应属性名 */
    keyPropName?: string;
    /** title 对应属性名 */
    titlePropName?: string;
    /** 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', title:"test1",...},...]， pId 是父节点的 id) */
    treeDataSimpleMode?: boolean;
    /** simpleMode模式下 id(即为key) pId title 属性名 {id:1, pId:0, title:"test1"} */
    simpleModePropName?: {
        id?: string;
        pId?: string;
        title?: string;
    };
    /** formItemValue */
    value?: string[];
};
declare const TreeSelectJPK: FC<TreeSelectJPKProps>;
export default TreeSelectJPK;
