import axios from 'axios'
import {ElMessage} from "element-plus";

const request = (config) => {
    const instance = axios.create({
        baseURL:'http://localhost:8081/api',
        timeout: 100000
    })

    instance.interceptors.response.use(
        response => {
            if (response.data.code!==2002 && response.data.msg){
                ElMessage.warning({
                    message:response.data.msg,
                    grouping:true,
                    type:'error'
                })
            }
            if (response.status !== 200){
                ElMessage.error({
                    message:response.data.msg,
                    grouping:true,
                    type:'error'
                })
            }
            return response.data;
        },
        error => {
            console.error(error)
            if (error.code){
                ElMessage.error({
                    message:"内部服务错误",
                    grouping:true,
                    type:'error'
                })
            }
        }
    );
    return instance(config)
}

export default request