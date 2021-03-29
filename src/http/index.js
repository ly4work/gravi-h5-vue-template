import axios from 'axios';
import config, { tokenHeaderMap, whiteList, ssoList } from './config';
import Cookie from '@/utils/Cookie';
import { entryUnique } from '@/utils/utils';
import _ from 'lodash';
import { message } from 'antd';
import { Logout } from '@/utils/logout';

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 1000 * 10,
});

const CancelToken = axios.CancelToken;

//  request拦截器
axiosInstance.interceptors.request.use(
  function (config) {
    const token = Cookie.getToken();
    const newConfig = _.cloneDeep(config);
    // if (process.env.NO_AUTH) {
    //   return newConfig;
    // }
    //  没有token时，登录页不进行重定向
    if (!whiteList.find((item) => item.test(location.href))) {
      if (token) {
        newConfig.headers[tokenHeaderMap.DDingAuthHeader] = token;
        newConfig.cancelToken = new CancelToken((c) => {
          entryUnique(config, c);
        });
      } else {
        //  否则重定向
        newConfig.cancelToken = new CancelToken((c) => {
          c();
          message.error('登录超时，请重新登录');
          Logout();
        });
      }
    }
    //  sso接入域名路径白名单
    if (ssoList.find((item) => item.test(location.href))) {

      newConfig.headers[tokenHeaderMap.SSOAuthHeader] = Cookie.get(
        'sso.login.account.operation.auth',
      );

    }

    return newConfig;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 拦截器，同样信息只弹出一次
function debounce(fn, wait) {
  let timerId = null;
  let flag = true;
  return function () {
    clearTimeout(timerId);
    if (flag) {
      fn.apply(this, arguments);
      flag = false;
    }
    timerId = setTimeout(() => {
      flag = true;
    }, wait);
  };
}

const authError = (text) => {
  debounce(() => {
    // Message.error(text);
  }, 1000)();
};

// response 拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      message.error(res.msg);
    }
    switch (res.code) {
      case 200: // 成功
        return res;
      case 998:
        return res;
      case 999:
        return res;
      case 5200:
        return res;
      //  token失效
      case 215:
        Logout();
        return res;
      default:
        return authError(`${res.code}: ${res.msg}`);
    }
  },
  (err) => {
    authError(err.message || '');
    return Promise.reject(err.response);
  },
);

export default axiosInstance;
