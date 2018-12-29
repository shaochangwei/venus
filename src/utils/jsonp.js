import axios from 'axios-jsonp-pro';

export const feachJsonp = (url,options) => {
  return axios.jsonp(url,{
    params:options
  });
};