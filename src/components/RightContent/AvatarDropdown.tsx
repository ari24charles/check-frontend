import { userLogout } from '@/services/backend/userController';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Button, Space } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await userLogout();
    location.href = '/home';
  };
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      // 个人中心 todo
      if (key === 'center') {
        history.push('/user/center');
      }
    },
    [setInitialState],
  );

  const { currentUser } = initialState || {};

  if (!currentUser) {
    return (
      <Button
        type="primary"
        shape="round"
        onClick={() => {
          window.location.href = `/user/login?redirect=${window.location.href}`;
        }}
      >
        登录
      </Button>
    );
  }

  const menuItems = [
    
    {
      key: 'center',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <Space>
        {currentUser?.avatarUrl ? (
          <Avatar size="small" src={currentUser?.avatarUrl} />
        ) : (
          <Avatar size="small" icon={<UserOutlined />} />
        )}
        <span className="anticon">{currentUser?.nickname ?? '用户名'}</span>
      </Space>
    </HeaderDropdown>
  );
};

export const AvatarName = () => {};
