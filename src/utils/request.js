import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import { feachJsonp } from './jsonp';
const Message = message;


let message_lang = {
  zh: {
    warning: '提示',
    confirm: '确定',
    session_timeout: '您当前的会话已超时，请重新登录。',
    go_to_login: '还没有登录，请前往',
    login: '登录',
    cancel: '取消',
    ok: '好',
    try_later: '服务出错，请稍后再试'
  },
  en: {
    warning: 'prompt',
    session_timeout: 'Your current session has timed out. Please log in again.',
    go_to_login: 'Not yet logged in, please go ',
    login: 'login',
    cancel: 'cancel',
    confirm: 'confirm',
    ok: 'OK',
    try_later: 'Service error, please try again later'
  }
};

// ====== Request Class ======
let lang = 'zh';
let mess = message_lang[lang] || {};
const defaultOptions = {};

/**
 * Requests a URL, returning a promise.
 * @param {string} url     The URL we want to request
 * @param {object} options The options we want to pass to "fetch"
 * @return {object}        An object containing either "data" or "err"
 */
export function request(url,options){
  //setDefault
  options = {
    ...defaultOptions,
    ...options
  };
  return axios(url, options)
    .then(checkStatus)
    .then((res) => {
      let result = checkResponse(res.data, options);
      return result();
    })//借口通信成功，处理返回值
    .catch(err => {
      handleError(err, options);
    });//发生异常，进行兜底处理
}

//function parseJSON(response) {
//   return response.json()
// }
function checkStatus(response) {
  if (response.status >= 200 && response < 300) 
    return response;
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function createMessage(err) {
  Message.error({
    title: mess['warning'],
    content: <div dangerouslySetInnerHTML={{
      __html: '<span style="color:#FF8A00">' +
        '<span class="k-iconfont  icon-jingshi " style="float:left;margin:-4px 6px 0 0"></span>' +
        err +
        '</span>'
    }} ></div>,
    closeable: true,
    size: 'large',
    align: 'cc cc',
    hasMask: true
  });
}

// ====== Response Class ======
class AbstractResponse {
  constructor(response, error) {
    if (response) {
      this.code = response.code;
      this.data = response.data;
      this.msg = response.msg || response.message;
    }
    this.error = error || null;
  }
}

/**
 * 接口正常时的返回对象
 */
class SuccessResponse extends AbstractResponse {
  constructor(response) {
    super(response, null);
  }
}

//====== 接口返回值处理具体逻辑 ======
const SUCCESS_CODE = '200';
const ErrorHandlers = {
  'verifyCodeInvalid': ()=>{},
  '403': function () {
    location.href = '#/nopermission';
  },
  'default': (response) => {
    createMessage(response.message || message.try_later);
  }
};

/**
 * 接口返回值处理逻辑，如果未捕获到匹配值的处理方案，则抛出异常
 * @param {*} response 响应
 * @param {*} options 配置可选项，如忽略错误
 * @return {response} 返回响应
 */
function checkResponse(response, options) {
  let { data = {} } = response;
  if (!data) {
    data = {};
  }
  options = options || {};
  //不一定会有
  let errorMessage = response.message || response.msg;
  let { code } = response;
  if (code == SUCCESS_CODE && data) 
    return new SuccessResponse(response);
  if (!options.ignoreError) {
    code = response.code || 'default';
    let errorHandler = ErrorHandlers[code];
    if (!errorHandler) throw new Error(errorMessage || code);
    errorHandler(response);
    return response;
    //throw new ErrorResponse(response);
  } else {
    return new SuccessResponse(response);
  }
}

// 兜底的错误处理
function handleError(err, options) {
  options = options || {};
  if(!options.ignoreError) createMessage(err);
}

// ====== Util ======
//  参数转码
// { a: 1, b: 2 } ==> a=1&b=2  
function stringify(obj = {}) {
  return Object.keys(obj)
    .filter(k => obj[k] || obj[k] === 0)
    .map(k => {
      let value = obj[k];
      if (typeof value == 'object') {
        value = encodeURIComponent(JSON.stringify(value));
      }else{
        value = encodeURIComponent(value);
      }
      return encodeURIComponent(k) + '=' + value;
    })
    .join('&');
}

// ====== 各类请求 ======

/**
 * GET 请求
 * @param {string} url 请求接口地址
 * @param {object} params 请求参数
 * @param {object} options 传递给fetch API的参数
 * @return {promise} 返回promise
 */
export function get(url, params = {}, options = {}) {
  let data = {};
  Object.keys(params).filter(key => params[key] !== undefined && params[key] !== '').map(key => {
    data[key] = params[key];
  });
  return request(url, {
    params: data,
    header: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    ...options
  });
}

/**
 * POST 请求
 * @param {string} url - 请求的接口地址 
 * @param {*} data data - 请求参数
 * @param {*} options  - 传递给fetch API的参数
 * @return {promise} 返回promise
 */
export function post(url, data, options = {}) {
  return request(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: stringify({
      param: data,
      sec_token: (window.ALIYUN_CONSOLE_CONFIG || {}).SEC_TOKEN,
      _csrf: window.__csrf_token__
    }),
    ...options
  });
}

/**
 * PUT 请求
 * @param {string} url - 请求的接口地址 
 * @param {*} data data - 请求参数
 * @param {*} options  - 传递给fetch API的参数
 * @return {promise} 返回promise
 */
export function put(url, data, options = {}) {
  return request(url, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: stringify({
      param: data,
      sec_token: (window.ALIYUN_CONSOLE_CONFIG || {}).SEC_TOKEN,
      _csrf: window.__csrf_token__
    }),
    ...options
  });
}

/**
 * DELETE 请求
 * @param {string} url - 请求的接口地址 
 * @param {*} data data - 请求参数
 * @param {*} options  - 传递给fetch API的参数
 * @return {promise} 返回promise
 */
export function del(url, data, options = {}) {
  const query = stringify(data);
  return request(`${url}?${query}`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      sec_token: (window.ALIYUN_CONSOLE_CONFIG || {}).SEC_TOKEN,
      _csrf: window.__csrf_token__
    },
    ...options
  });
}

export function jsonp(url, params = {}, options = {}) {
  options = {
    ...defaultOptions,
    ...options
  };
  return feachJsonp(`${url}?${stringify(params)}`, options)
    .then(res => {
      return res;
    })//接口成功，处理返回值
    .catch(err => 
      handleError(err, options));//发生异常，进行兜底处理
}