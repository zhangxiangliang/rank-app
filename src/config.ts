// 应用配置
export const CONFIG_APP_NAME = "电气鼠 Rank";
export const CONFIG_APP_ENV = process.env.NODE_ENV;
export const CONFIG_BASE_URL = CONFIG_APP_ENV === "development" ? 'http://rank.test' : 'https://rank.pushme.top';

// 接口配置
export const CONFIG_API_VERSION = "v1";
export const CONFIG_API_URL = `${CONFIG_BASE_URL}/api/${CONFIG_API_VERSION}`;

// CDN配置
export const CONFIG_CDN_URL = 'http://rank-cdn.pushme.top';
export const CONFIG_WAVE = `${CONFIG_CDN_URL}/wave.gif`;
export const CONFIG_QRCODE = `${CONFIG_CDN_URL}/qrcode.png`;

// 日志页面配置
export const PAGE_LOG_INDEX = '/packages/log/index/index';

// 用户页面配置
export const PAGE_USER_INDEX = '/packages/page/user/index';

// 抖音页面配置
export const PAGE_RANK_INDEX = '/packages/page/rank/index';
export const PAGE_RANK_SHOW = '/packages/rank/show/index';
