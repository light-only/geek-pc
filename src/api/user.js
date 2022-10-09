import server from "utils/request";

/**
 * 登录请求，用于用户登录
 * @param {string} mobile 用户手机号
 * @param {string} code 手机号验证码
 * @returns Promise
 */

export const login = (mobile,code)=>{
   return server({
        method:'post',
        url:'/authorizations',
        data:{
            mobile,
            code
        }
    })
}

/**
 * 获取用户信息接口
 * @returns {*}
 */
export const getUserProfile = ()=>{
    return server({
        method:'get',
        url:'/user/profile'
    })
}

