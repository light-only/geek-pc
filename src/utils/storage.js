


//设置token变量
 const TOKEN_KEY = 'token-geek-pc-longzihu';

/**
 *  用来存储token
 * @param token
 */
export const setToken = (token)=>localStorage.setItem(TOKEN_KEY,token);

/**
 *  用来获取token
 * @returns {string}
 */
export const getToken = ()=> localStorage.getItem(TOKEN_KEY);


/**
 * 用来删除token
 */
export const removeToken = ()=>localStorage.removeItem(TOKEN_KEY);

/**
 * 判断是否存在token
 * @returns {boolean}
 */
export const hasToken =()=> !!getToken();