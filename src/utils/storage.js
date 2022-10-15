

const TOKEN_kEY = 'geek-pc-token-free';

/**
 * 存储token
 * @param token
 */
function setToken (token){
    localStorage.setItem(TOKEN_kEY,token);
}

/**
 * 获取token
 * @returns {string}
 */
function getToken(){
   return localStorage.getItem(TOKEN_kEY);
}

/**
 * 删除token
 */
function removeToken(){
    localStorage.removeItem(TOKEN_kEY);
}

/**
 * 判断是否有token
 * @returns {boolean}
 */
function hasToken(){
    return !!getToken()
}

export {setToken,getToken,removeToken,hasToken}