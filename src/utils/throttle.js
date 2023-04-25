export function throttle(fn, delay) {  //这里是否是箭头函数没有关系
    let timer = null;
    return function (...args) {  //如果这里return箭头函数，则没有this，会向上查找this，找到window
      if (timer!=null) return;
      timer = setTimeout(() => {
        fn.apply(this,args)
        timer = null
      }, delay)
    }
  }