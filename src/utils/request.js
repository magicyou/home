import axios from 'axios'
import { debounce } from './optimize';
import { notification } from 'antd';
// const Host = 'http://127.0.0.1:7001';
const Host = 'https://magicyou.cn';

const debounceMessage = debounce(function (message) {
    notification.error({ title: 'error', message: message })
}, 100)

const getToken = function () {
    return localStorage.getItem('token') || '';
}

// api 配置
let timer = null
const onError = error => {

    if (error.response) {
        const status = error.response.status
        const message = error.response.statusText

        if (status === 403) {
            notification.error({ title: 'Forbidden', message: message })
        }

        if (status === 404) {
            notification.error({ title: 'Unknown resources', message: message })
        }

        if (status === 500) {
            notification.error({
                title: 'Server error',
                message: message
            })
        }

        if (status === 401) {
            timer = setTimeout(() => {
                notification.error({
                    title: 'Timeout',
                    message: 'Login Timeout'
                })
                if (getToken()) {
                    //   store.dispatch('user/Logout').then(() => router.replace('/login'))
                }
                timer = null
            }, 500)
        }
    } else if (error.toString().includes('Error: Network Error')) {
        notification.error({
            title: 'Network Error',
            message: 'Network Error'
        })
    }
    return Promise.reject(error)
}

const request = axios.create({
    baseURL: Host + '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    transformRequest: [
        function (data, headers) {
            const token = 'Bearer ' + getToken();
            if (token) {
                headers['authorization'] = token
            }
            if (headers['Content-Type'] === 'multipart/form-data') {
                return data
            } else {
                return JSON.stringify(data)
            }
        }
    ]
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 开发环境下，如果请求是 post,put,patch,则打印数据体，方便调试
        if (process.env.NODE_ENV === 'development') {
            const { method } = config
            if (['post', 'put', 'patch'].includes(method)) {
                console.log(config.data)
            }
        }

        return config
    },
    error => {
        notification.error({
            title: 'The request failed',
            message: 'The sending request failed. Please check your network'
        })
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(response => {
    const { config, data, headers } = response;
    console.log('config；', config);
    console.log('headers', headers);
    const jsonPattern = /application\/json/gi
    if (!jsonPattern.test(headers['content-type'])) {
        return response
    } 
    
    if ( data.code !== 0 ) {
        debounceMessage(data.msg);
        return Promise.reject(data)
    }

    return data.data;
}, onError)

export default request
