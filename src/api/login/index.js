import axios from '../../utils/request';

const UrlObj = {
    doLoginUrl: '/login'
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