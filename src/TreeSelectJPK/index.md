---
title: 01.TreeSelectJPK
order: 1
nav:
  title: Components
  path: /Components
  order: 0
group:
  path: /Components
  title: Components
  order: 0
---

## TreeSelectJPK

Demo:

```tsx
import React from 'react';
import { TreeSelectJPK } from 'jpk-compon';

export default () => {
  const treeData = [
    { id: '1', s: '1' },
    { id: '1-1', s: '1-1', pd: '1' },
    { id: '1-2', s: '1-2', pd: '1' },
    { id: '1-3', s: '1-3', pd: '1' },
    { id: '2', s: '2' },
    { id: '2-1', s: '2-1', pd: '2' },
    { id: '2-1-1', s: '2-1-1', pd: '2-1' },
    { id: '2-1-2', s: '2-1-2', pd: '2-1' },
    { id: '2-2', s: '2-2', pd: '2' },
    { id: '2-3', s: '2-3', pd: '2' },
  ];

  const dataKeys = ['2-2', '2-1-1', '2-1', '2'];

  return (
    <TreeSelectJPK
      selectProps={{ style: { width: 300 } }}
      treeData={treeData}
      treeDataSimpleMode
      simpleModePropName={{
        title: 's',
        pId: 'pd',
      }}
    />
  );
};
```

Demo2:

```tsx
import React from 'react';
import { TreeSelectJPK } from 'jpk-compon';
import { Form } from 'antd';

export default () => {
  const treeData = [
    { id: '1', s: '1' },
    { id: '1-1', s: '1-1', pd: '1' },
    { id: '1-2', s: '1-2', pd: '1' },
    { id: '1-3', s: '1-3', pd: '1' },
    { id: '2', s: '2' },
    { id: '2-1', s: '2-1', pd: '2' },
    { id: '2-1-1', s: '2-1-1', pd: '2-1' },
    { id: '2-1-2', s: '2-1-2', pd: '2-1' },
    { id: '2-2', s: '2-2', pd: '2' },
    { id: '2-3', s: '2-3', pd: '2' },
  ];

  const dataKeys = ['2-1-1', '1-3', '2-1-half', '1-half', '2-half']; // ['2-1-1', '1-3']

  return (
    <Form>
      <Form.Item initialValue={dataKeys} label="Select" name="select">
        <TreeSelectJPK
          selectProps={{ style: { width: 300 } }}
          treeData={treeData}
          treeDataSimpleMode
          simpleModePropName={{
            title: 's',
            pId: 'pd',
          }}
        />
      </Form.Item>
    </Form>
  );
};
```

Demo3:

```tsx
import React from 'react';
import { TreeSelectJPK } from 'jpk-compon';
import { Form } from 'antd';

export default () => {
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
        },
      ],
    },
  ];

  const dataKeys = ['0-0-0-1', '0-0-0-half', '0-0-half']; // ['0-0-0-1']

  return (
    <Form>
      <Form.Item initialValue={dataKeys} label="Select" name="select">
        <TreeSelectJPK selectProps={{ style: { width: 300 } }} treeData={treeData} />
      </Form.Item>
    </Form>
  );
};
```

### TreeSelectJPK props

| ?????? | ?????? | ?????? |
| --- | --- | --- |
| treeData | Tree ??? treeData | any[] |
| selectProps | select ?????? | TreeProps |
| treeProps | tree ?????? | any[] |
| keyPropName | key ??????????????? | string |
| titlePropName | title ??????????????? | string |
| treeDataSimpleMode | ????????????????????? treeData??????????????????????????????????????? (?????? treeData ??????????????????????????????: [{id:1, pId:0, value:'1', title:"test1",...},...]??? pId ??????????????? id) | boolean |
| simpleModePropName | simpleMode ????????? id(?????? key) pId title ????????? {id:1, pId:0, title:"test1"} | { id?: string; pId?: string; title?: string } |
| value | formItemValue | string[] |
