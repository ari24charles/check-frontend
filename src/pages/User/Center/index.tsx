import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  desc: string;
}> = ({ title, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '300px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {title === '昵称' && desc}
        {title === '电话' && desc}
        {title === '邮箱' && desc}
        {title === '性别' && desc === '0' && '保密'}
        {title === '性别' && desc === '1' && '男'}
        {title === '性别' && desc === '2' && '女'}
        {title === '状态' && desc === '0' && '正常'}
        {title === '状态' && desc === '1' && '封禁'}
        {title === '角色' && desc === '0' && '超级管理员'}
        {title === '角色' && desc === '1' && '管理员'}
        {title === '角色' && desc === '2' && '普通用户'}
      </div>
    </div>
  );
};

const UserCenter: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <Card
      style={{
        borderRadius: 8,
      }}
    >
      <div
        style={{
          backgroundPosition: '100% -30%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '274px auto',
          backgroundImage:
            "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          display: 'block',
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              lineHeight: '22px',
              backgroundSize: '100%',
              textAlign: 'center',
              padding: '8px 16px 16px 12px',
              color: '#FFF',
              fontWeight: 'bold',
              backgroundImage:
                "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
              display: 'block',
            }}
          >
            {initialState?.currentUser?.id}
          </div>
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
              marginBottom: 10,
              display: 'block',
            }}
          >
            {`${initialState?.currentUser?.username} 你好`}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <InfoCard title="昵称" desc={`${initialState?.currentUser?.nickname}`} />
          <InfoCard title="电话" desc={`${initialState?.currentUser?.phone}`} />
          <InfoCard title="邮箱" desc={`${initialState?.currentUser?.email}`} />
          <InfoCard title="性别" desc={`${initialState?.currentUser?.gender}`} />
          <InfoCard title="状态" desc={`${initialState?.currentUser?.status}`} />
          <InfoCard title="角色" desc={`${initialState?.currentUser?.role}`} />
        </div>
      </div>
    </Card>
  );
};

export default UserCenter;
