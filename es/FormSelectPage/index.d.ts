import React from 'react';
import type { FC } from 'react';
import type { SelectProps, PaginationProps } from 'antd';
import { ProFormSelect } from '@ant-design/pro-form';
import { SetState } from 'ahooks/lib/useSetState';
export declare type TFormSelectPage = {
    /** ProFormSelect属性 */
    proFormSelectProps?: typeof ProFormSelect;
    /** fieldProps Select的属性 */
    fieldProps?: SelectProps;
    /** 分页属性 */
    extraPageProps?: PaginationProps;
    /** 获取数据并处理 */
    asyncGetList: (setPageProps: SetState<PaginationProps>, setOptions: React.Dispatch<React.SetStateAction<any[]>>) => void;
};
declare const FormSelectPage: FC<TFormSelectPage>;
export default FormSelectPage;
