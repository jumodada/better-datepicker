// 之所以加这个函数是因为数组解构写法转成es5后代码太多了一点。。。
export function concat<A>(a: A[], b: A[]): A[] {
  return a.concat(b)
}
