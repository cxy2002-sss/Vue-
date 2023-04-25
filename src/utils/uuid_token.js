import {v4 as uuidv4} from 'uuid';
export const getUUID=()=>{
    //如果本地存储里面有uuid_token这个数据，则返回这个数据，如果没有则设置一个
    let uuid_token=localStorage.getItem('uuid_token');
    if(!uuid_token&&!localStorage.getItem('TOKEN')){
        uuid_token=uuidv4()
        localStorage.setItem('uuid_token',uuid_token);
    }
    return uuid_token;
}
