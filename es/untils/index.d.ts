/**
 *
 * 实现树级递归，生成树形菜单
 * toTree(
    {msg.data,
    '_id',
    'lastMenu',
    (item) => item,}
  )
 * @param {any[]} data 要转换的数组
 * @param {string} key 标识字段
 * @param {string} parentKey 父级字段
 * @param {Function} cb 对item处理的回调函数 (item) => item
 * @param {string} children 子数组字段
 * @param {string} type 基本用于菜单的筛选，菜单与组件用同一个接口，可以前端筛选出菜单也可以后端做,
 * 非菜单节点的子节点请不要设置菜单节点，一般也没有改业务
 * @returns
 */
export declare const toTree: ({ data, key, parentKey, cb, children, type, }: {
    data: any[];
    key: string;
    parentKey: string;
    cb: (param: any) => any;
    children?: string | undefined;
    type?: string | undefined;
}) => any[];
