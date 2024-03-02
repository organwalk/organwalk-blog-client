import http from "@/api/http";

export const getHomeData = (typeId) => {
    return http.get('/home/' + typeId)
}