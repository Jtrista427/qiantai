import { v4 as uuidv4 } from 'uuid'
// 要生成随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    // 先看本地存储是否有
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN", uuid_token)
    }
    return uuid_token
}
