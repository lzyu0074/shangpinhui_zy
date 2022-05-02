export const setTokenInLocalStorage = (token) => {
  localStorage.setItem('UserToken', token)
}
export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('UserToken')
}
export const removeTokenInLocalStorage = () => {
  localStorage.removeItem('UserToken')
}