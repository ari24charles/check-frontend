import { AvatarDropdown } from '@/components';
import { getCurrentUser } from '@/services/backend/userController';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { requestConfig } from './requestConfig';

const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  const initialState: InitialState = {
    currentUser: undefined,
  };
  const { location } = history;
  // 如果不是登录页面，执行 getCurrentUser
  if (location.pathname !== loginPath) {
    try {
      const res = await getCurrentUser();
      // 获取到用户信息
      initialState.currentUser = res.data;
    } catch (error: any) {
      // 用户暂未登录
    }
  }
  return initialState;
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    avatarProps: {
      render: () => {
        return <AvatarDropdown />;
      },
    },
    waterMarkProps: {
      // 水印
      content: initialState?.currentUser?.username,
    },
    menuHeaderRender: undefined,
    ...defaultSettings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
