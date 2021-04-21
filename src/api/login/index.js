import axios from '../../utils/request';

const UrlObj = {
    doLoginUrl: '/login',
    checkTokenUrl: '/checkToken'
};

/**
 * 登录
 * @method Login
 * @for 登录页
 * @param {data} 参数
 * @return {Promise} 返回值说明
 */
export const loginApi = (data) => {
    return axios.request(
        {
            url: UrlObj.doLoginUrl,
            data : data,
            method: 'post'
        }
    )
};

/**
  * 检查token
  * @author Bruce Lee
  * @date 2021-04-21
  * @returns {Promise}
  */
export const checkTokenApi = () => {
    return axios.request(
        {
            url: UrlObj.checkTokenUrl,
            method: 'get'
        }
    )
};