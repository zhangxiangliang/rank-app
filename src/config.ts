// 应用配置
export const CONFIG_APP_ENV = process.env.NODE_ENV;
export const CONFIG_BASE_URL = CONFIG_APP_ENV === "development" ? 'http://rank.test' : 'https://rank.pushme.top';

// 接口配置
export const CONFIG_API_VERSION = "v1";
export const CONFIG_API_URL = `${CONFIG_BASE_URL}/api/${CONFIG_API_VERSION}`;

// CDN配置
export const CONFIG_CDN_URL = `${CONFIG_BASE_URL}`;