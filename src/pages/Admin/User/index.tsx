import { listUser, switchUserRole, switchUserStatus } from '@/services/backend/userController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Space, Tag, Typography } from 'antd';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const roleState = initialState?.currentUser?.role;
  const handleRole = (record) => {
    switchUserRole(record);
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };
  const handleStatus = (record) => {
    switchUserStatus(record);
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };

  const columns: ProColumns<API.User>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '账号',
      dataIndex: 'username',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '邮件',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '保密',
        },
        1: {
          text: '男',
        },
        2: {
          text: '女',
        },
      },
      render: (_, record) => (
        <Space>
          {record.gender === 0 && <Tag>{'保密'}</Tag>}
          {record.gender === 1 && <Tag color="green">{'男'}</Tag>}
          {record.gender === 2 && <Tag color="red">{'女'}</Tag>}
        </Space>
      ),
    },

    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueEnum: {
        0: {
          text: '正常',
          status: 'Processing',
        },
        1: {
          text: '封禁',
          status: 'Error',
        },
      },
      hideInSearch: true,
    },
    {
      title: '角色',
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '超级管理员',
        },
        1: {
          text: '管理员',
        },
        2: {
          text: '普通用户',
        },
      },
      render: (_, record) => (
        <Space>
          {record.role === 0 && <Tag color="purple">{'超级管理员'}</Tag>}
          {record.role === 1 && <Tag color="blue">{'管理员'}</Tag>}
          {record.role === 2 && <Tag>{'普通用户'}</Tag>}
        </Space>
      ),
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          {roleState === 0 && (
            <Typography.Link
              onClick={() => {
                handleRole(record);
              }}
            >
              {record.role === 1 && '降为普通用户'}
              {record.role === 2 && '升级为管理员'}
            </Typography.Link>
          )}
          <Typography.Link
            type="danger"
            onClick={() => {
              handleStatus(record);
            }}
          >
            {record.status === 0 && record.role !== 0 && '封禁'}
            {record.status === 1 && '解封'}
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<API.User>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        // 转为下划线字段
        let sortField = Object.keys(sort)?.[0];
        const sortOrder = sort?.[sortField] ?? undefined;
        if (sortField) {
          sortField = sortField.replace(/\B([A-Z])/g, '_$1').toLowerCase();
        }
        const res = await listUser({
          ...params,
          sortField,
          sortOrder,
          ...filter,
        } as API.AdminQueryRequest);
        return {
          success: res.code === 20000,
          data: res.data?.records || [],
          total: Number(res.data?.total) || 0,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      scroll={{ x: 1300 }}
    />
  );
};
