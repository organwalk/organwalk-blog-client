import http from "@/api/http";

export const getHomeData = (typeId) => {
    return http.get('/home/' + typeId)
}

export const searchArticleAboutAll = (keyword, offset) => {
    return http.get('/articles/1/' + keyword + '/none/' + offset)
}

export const searchArticleAboutTag = (keyword, tagName, offset) => {
    return http.get('/articles/2/' + keyword + '/' + tagName + '/' + offset)
}

export const searchArticleAboutType = (keyword, typeId, offset) => {
    return http.get('/articles/3/' + keyword + '/' + typeId + '/' + offset)
}

export const getTypeArticleData = (type, offset) => {
    return http.get('/articles/type/' + type + '/' + offset)
}

export const getTagsArticleCountByType = (type) => {
    return http.get('/articles/type/tags/' + type)
}

export const getTagArticleData = (tag, offset) => {
    return http.get('/articles/tag/' + tag + '/' + offset)
}