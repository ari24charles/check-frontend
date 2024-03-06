import { BACKEND_DEV, BACKEND_PROD } from '@/constants';
import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';

const isDev = process.env.NODE_ENV === 'development';

export const requestConfig: RequestConfig = {
  baseURL: isDev ? BACKEND_DEV : BACKEND_PROD,
  withCredentials: true,

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求
      // 放行请求
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据
      const { data } = response as unknown as BaseResponse<any>;
      if (!data) {
        // 没有收到响应
        throw new Error('服务器异常');
      }
      // 获取状态码
      const code: number = data.code;
      if (code !== 20000) {
        // 请求发生错误
        if (data.description) {
          // 如果响应中有 description 字段
          throw new Error(data.description ?? '请求处理失败');
        }
        // 如果响应中有没有 description 字段，则使用 msg 字段
        throw new Error(data.msg ?? '请求处理失败');
      }
      // 返回响应
      return response;
    },
  ],
};
