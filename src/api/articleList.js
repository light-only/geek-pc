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

/**
 * 删除文章接口
 * @param {string} id 文章id
 * @returns {*}
 */
export function delArticle(id) {
    return server({
        url:`/mp/articles/${id}`,
        method:'delete'
    })
}

/**
 * 新增文章接口
 * @param {Object} data
 * @param {Boolean} draft 判断是否为草稿，true表示草稿，false不是草稿，query参数
 * @returns {*}
 */
export function addArticle(data,draft=true) {
    return server({
        url:`/mp/articles?draft=${draft}`,
        method:'post',
        data
    })
}

/**
 * 获取文章信息接口
 * @param {String} id
 * @returns {*}
 */
export function getArticle(id) {
    return server({
        url:`/mp/articles/${id}`
    })
}

/**
 * 编辑文章接口
 * @param {Object} data
 * @param {Boolean} draft
 * @returns {*}
 */
export function editArticle(data,draft) {
    return server({
        url:`/mp/articles/${data.id}?draft=${draft}`,
        method:'put',
        data
    })
}