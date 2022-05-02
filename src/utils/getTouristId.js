// 生成uuid
import { v4 as uuidv4 } from 'uuid';
export const getTouristId = () => {
  // 先试试能不能拿到，若存在，就拿，不存在，就创建一个
  let uuid_token_tourist = localStorage.getItem('uuid_token_tourist')
  if (!uuid_token_tourist) {
    uuid_token_tourist = uuidv4()
    localStorage.setItem('uuid_token_tourist', uuid_token_tourist)
  }
  return uuid_token_tourist
}