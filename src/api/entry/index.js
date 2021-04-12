import axios from '@/utils/request';

const UrlObj = {
    getEntryListUrl: '/home/getEntryList',
    deleteEntryByIdUrl: '/home/deleteEntryById',
    switchEntryDisplayByidUrl: '/home/switchEntryDisplayByid'
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
