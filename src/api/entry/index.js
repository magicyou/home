import axios from '../../utils/request';

const UrlObj = {
    getEntryListUrl: '/home/getEntryList',
    deleteEntryByIdUrl: '/home/deleteEntryById',
    addEntryUrl: '/home/addEntry',
    switchEntryDisplayByidUrl: '/home/switchEntryDisplayByid',
    getIconListUrl: '/icon/getIconList'
};

/**
 * 获取入口数据
 * @author Bruce Lee
 * @date 2021-04-12
 * @param {any} data
 * @returns {any}
 */
export const getEntryListApi = (data) => {
    return axios.request(
        {
            url: UrlObj.getEntryListUrl,
            params: data,
            method: 'get'
        }
    )
};

/**
 * 获取入口数据
 * @author Bruce Lee
 * @date 2021-04-12
 * @param {any} data
 * @returns {any}
 */
 export const deleteEntryByIdApi = (data) => {
    return axios.request(
        {
            url: UrlObj.deleteEntryByIdUrl,
            params: data,
            method: 'delete'
        }
    )
};

/**
 * 添加新入口
 * @author Bruce Lee
 * @date 2021-04-12
 * @param {any} data
 * @returns {any}
 */
 export const addEntryApi = (data) => {
    return axios.request(
        {
            url: UrlObj.addEntryUrl,
            data: data,
            method: 'post'
        }
    )
};

/**
 * 更改入口显示隐藏
 * @author Bruce Lee
 * @date 2021-04-12
 * @param {any} data
 * @returns {any}
 */
 export const switchEntryDisplayByidApi = (data) => {
    return axios.request(
        {
            url: UrlObj.switchEntryDisplayByidUrl,
            data: data,
            method: 'put'
        }
    )
};

/**
 * 获取icon的列表
 * @author Bruce Lee
 * @date 2021-04-12
 * @param {any} data
 * @returns {any}
 */
export const getIconListApi = (data) => {
    return axios.request(
        {
            url: UrlObj.getIconListUrl,
            params: data,
            method: 'get'
        }
    )
};