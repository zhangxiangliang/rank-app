import { CONFIG_API_URL } from '@/config';

/**
 * 请求类型
 */
export enum HTTP_REQUEST_METHOD {
  OPTIONS = 'OPTIONS',
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  TRACE = 'TRACE',
  CONNECT = 'CONNECT',
};

/**
 * 拼接请求头
 */
export const HTTP_DEFAULT_HEADER = {
  "Accept": "application/json",
  "Content-Type": "application/json",
};

/**
 * 设置基础路由
 */
export const HTTP_BASE_URL = CONFIG_API_URL;

/**
 * 基础响应结构
 */
export interface Response<T> {
  data: T;
  meta: {
    current_page: number;
    last_page: number;
  }
}

/**
 * 基础应用请求
 */
export interface Http {
  /**
   * 请求路由
   */
  url: string;

  /**
   * 请求地址
   */
  base?: string;

  /**
   * 请求参数
   */
  data?: string | AnyObject | ArrayBuffer;

  /**
   * 请求头
   */
  header?: any;

  /**
   * 响应类型
   */
  responseType?: string;

  /**
   * 请求方法
   */
  method?: HTTP_REQUEST_METHOD;
};

/**
 * 请求成功回调函数
 */
export interface RequestSuccessCallbackResult<T> {
  /**
   * 服务器返回的数据
   */
  data: T;

  /**
   * 服务器返回的 HTTP 状态码
   */
  statusCode: number;

  /**
   * 服务器返回的 HTTP Response Header
   */
  header: any;

  /**
   * 服务器返回的 cookies，格式为字符串数组
   */
  cookies: string[];
}

/**
 * 基础应用请求
 */
export function http<T>({
  url = '',
  data = {},
  header = {},
  responseType = 'text',
  base = HTTP_BASE_URL,
  method = HTTP_REQUEST_METHOD.GET,
}: Http): Promise<T> {
  return new Promise((resolve, reject) => {
    const isBaseUrl = base === HTTP_BASE_URL;

    // 如果是基础路由则显示加载动效
    isBaseUrl && uni.showLoading({ title: "加载中", mask: true });

    // 拼接请求
    url = `${base}${url}`;

    // 基础数据
    const requestData = {
      url,
      method,
      data: data,
      withCredentials: true,
      responseType: responseType,
      header: { ...HTTP_DEFAULT_HEADER, ...header }
    };

    // 失败回调函数
    const requestFailCallback = (res: UniApp.GeneralCallbackResult) => {
      if (res.errMsg == "request:fail") {
        uni.showToast({
          title: "网络连接失败,请检查设备的网络通信是否正常",
          icon: "none",
          duration: 4000
        });
      }

      reject(res);
    }

    // 完成回调函数
    const requestCompleteCallback = () => {
      // 如果是基础路由则隐藏动效
      base === HTTP_BASE_URL && uni.hideLoading();
    }

    // 成功回调函数
    const requestSuccessCallback = (res: RequestSuccessCallbackResult<T>) => {
      const { data, statusCode } = res as RequestSuccessCallbackResult<T>;
      statusCode == 200 ? resolve(data) : reject(data);
    }

    uni.request({
      ...requestData,
      fail: requestFailCallback as (result: UniApp.GeneralCallbackResult) => void,
      complete: requestCompleteCallback as (result: UniApp.GeneralCallbackResult) => void,
      success: requestSuccessCallback as (result: UniApp.RequestSuccessCallbackResult) => void,
    });
  });
}

/**
 * 导出默认函数
 */
export function $http<T>(params: Http): Promise<T> {
  return http({
    ...params
  });
};

/**
 * 导出默认函数
 */
export function $get<T>(params: Http): Promise<T> {
  return http({
    ...params,
    method: HTTP_REQUEST_METHOD.GET,
  });
};

/**
 * 导出默认函数
 */
export function $put<T>(params: Http): Promise<T> {
  return http({
    ...params,
    method: HTTP_REQUEST_METHOD.PUT,
  });
};

/**
 * 导出默认函数
 */
export function $post<T>(params: Http): Promise<T> {
  return http({
    ...params,
    method: HTTP_REQUEST_METHOD.POST,
  });
};

/**
 * 导出默认函数
 */
export function $delete<T>(params: Http): Promise<T> {
  return http({
    ...params,
    method: HTTP_REQUEST_METHOD.DELETE,
  });
};

/**
 * 获取 Code
 */
export function getCodeByWechat(): Promise<string> {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: "weixin",
      success: (res) => {
        resolve(res.code);
      },
      fail: () => {
        resolve('');
      }
    });
  });
}
