declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

/**
 * 做分页查询时，包含分页信息和数据的封装类
 */
interface PageResponse<T> {
  current: number;
  size: number;
  total: number;
  records: T[];
}

/**
 * 通用返回类
 */
interface BaseResponse<T> {
  code: number;
  data: T;
  msg: string;
  description?: string;
}

/**
 * 全局初始化状态
 * - 当前用户视图
 */
interface InitialState {
  currentUser?: API.UserVo;
}
