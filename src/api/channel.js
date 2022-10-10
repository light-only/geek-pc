import server from 'utils/request'
//封装和频道有关的接口

/**
 * 用来获取文章列表中的频道选择字典信息
 * @returns {Array}
 */
export function getChannels(){
    return server({
        method:'get',
        url:'/channels'
    })
}