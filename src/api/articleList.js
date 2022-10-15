import server from "utils/request";

/**
 * 获取文章列表数据接口
 * @param params 传递参数
 * @returns {Object}
 */
export function getArticleList(params){
    return server({
        method:'get',
        url:'/mp/articles',
        params
    })
}