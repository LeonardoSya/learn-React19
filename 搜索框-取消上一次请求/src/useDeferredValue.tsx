import { useDeferredValue, useState } from "react";

export default function Test() {
  const [counter, setCounter] = useState(0)
  
  //* useDeferredValue可以推迟【UI渲染任务】，但不推迟一般的 同步逻辑任务
  //* useDeferredValue在不同性能的设备上，有不同的反应。这是跟防抖节流最重要的区别
  const deferred = useDeferredValue(counter)  // 使用counter作为useDeferredValue的初始值

  function handle() {
    setCounter(counter + 1)
  }

  return (
    <>
      <button onClick={handle}>click</button>

      {/* 状态counter被两个元素使用，因此这两个元素的更改实际上是一个任务，他们会同时响应counter的变化 */}
      <div>counter: {counter}</div>
      <div>第二个counter替换为useDeferredValue(counter)的返回值: {deferred}</div> 
       {/* 第二个counter的更新优先级被降低(UI更新被推迟)，可以被更高优先级插队和中断  */}
    </>
  )
}