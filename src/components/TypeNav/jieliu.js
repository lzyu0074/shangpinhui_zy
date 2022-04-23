// 节流
function jieliu(fn, wait) {
  let timer
  let flag = true //节流锁，true为开锁状态
  return function() {
    if (!flag) return
    // 能进来就关锁
    flag = false

    timer = setTimeout(() => {
      // 指定时间后开锁
      flag = true
      fn.apply(this, arguments)
    }, wait)
  }
}
export default jieliu