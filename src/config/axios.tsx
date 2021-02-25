/*
 * @Description:
 * @Author: seven
 * @Date: 2020-06-07 12:48:57
 * @LastEditTime: 2020-07-05 02:29:43
 * @LastEditors: seven
 */
import axios from "axios";
// export let base = process.env.NODE_ENV === 'development' ? "http://" : "xx";
axios.defaults.timeout = 10000;    //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';        //配置请求头
// axios.defaults.baseURL = base;   //配置接口地址
// 请求前拦截
axios.interceptors.request.use(
    config => {
        let token;
        try {
            token = window.localStorage.getItem("token")
        } catch (e) {
        }
        config.headers = {
            ...config.headers,
            "Authorization": token
        }
        return config;
    },
    err => {
        console.log("请求超时");
        return Promise.reject(err);
    }
);

// 返回后拦截
axios.interceptors.response.use(
    res => {
        return Promise.resolve(res.data);
    },
    err => {
            return Promise.resolve(err.response.data);
        }
);

// @RequestBody请求
export const post = (url: string, params: object): any => {
    return axios({
        method: "post",
        url: url,
        data: params
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
        return err
    });
};

// @requestParam请求
export const postParam = (url: string, params: object): any => {
    return axios({
        method: "post",
        url: url,
        data: params,
        transformRequest: [
            function (data) {
                let ret = "";
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(res => {
        return res
    }).catch(err => {
        return err
    });
};

export const postMultiple = (url: string, params: object): any => {
    return axios({
        method: "post",
        url: url,
        data: params,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        return res
    }).catch(err => {
        return err
    });
};


export const get = (url: string): any => {
    const result = axios({
        method: "get",
        url: url
    }).then(res => {
        return res
    }).catch(err => {
        return err
    });
    return result
};
export const put = (url: string, params: object): any => {
    return axios({
        method: "put",
        url: url,
        data: params
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
        return err
    });
};
export const putParm = (url: string, params: object): any => {
    return axios({
        method: "put",
        url: url,
        data: params,
        transformRequest: [
            function (data) {
                let ret = "";
                for (const it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
        return err
    });
};



export const multiple = function (requestArray: any, callback: any) {
    axios.all(requestArray).then(axios.spread(callback));
};