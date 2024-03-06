import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const author = 'ariCharles';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${author}`}
      links={[
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> ari24charles
            </>
          ),
          href: 'https://github.com/ari24charles',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
