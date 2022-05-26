---
title: 04.FormSelectPage
order: 4
nav:
  title: Components
  path: /Components
  order: 0
group:
  path: /Components
  title: Components
  order: 0
---

## FormSelectPage

Demo:

```tsx
import React from 'react';
import { FormSelectPage } from 'jpk-compon';

export default () => {
  const asyncGetList = (setPageProps, setOptions) => {
    const data = ['1', '2', '3', '4', '5'];
    setPageProps({ total: data.length });
    const newData = data?.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    console.log(newData);
    setOptions(newData);
  };

  return <FormSelectPage asyncGetList={asyncGetList} />;
};
```

### FormSelectPage props

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| proFormSelectProps | ProFormSelect 属性 | ProFormSelectProps |
| fieldProps | fieldProps 属性 | ProFormSelect 的 fieldProps SelectProps |
| extraPageProps | 分页属性 | PaginationProps |
| asyncGetList | 获取数据并处理 | (setPageProps(修改 pageProps ahooks 的 SetState 方式): SetState\<PaginationProps>,setOptions(设置 select 的 options): React.Dispatch\<React.SetStateAction<any[]>>,pageProps: PaginationProps,) => void |
