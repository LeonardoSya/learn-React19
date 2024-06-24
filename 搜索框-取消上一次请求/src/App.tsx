//* AbortController 内建对象 可以终止异步任务
// const controller = new AbortController()
// const signal = controller.signal  // controller具有单个属性 signal，可以在这个属性上设置事件监听
// signal.addEventListener('abort', () => console.log('abort'))

// controller具有单个方法 abort()，调用时signal的事件监听就会执行
// console.log(signal.aborted)  // false
// controller.abort()
// console.log(signal.aborted)  // true

// fetch中封装了signal的事件监听，当在任意地方调用controller.abort()时，对应的请求就会取消

import { Suspense, useState, use,  useDeferredValue } from "react"
import './App.css'

const postApi = (query: number) => {
  const controller = new AbortController()
  const signal = controller.signal

  const promise = new Promise((resolve, reject) => {
    //* Promise构造函数期望一个同步执行的函数作为参数（一个立即执行的回调函数）
    //* 而async函数总是异步的，async函数内部的await语句会暂停函数执行直到Promise解析
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${query}`, { signal })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
  })

  promise.cancel = () => controller.abort()

  return promise
}

export default function App() {
  const [api, setApi] = useState(postApi(0))  // 将postApi执行返回的promise作为返回结果存在state中
  const [query, setQuery] = useState(0)

  // const [isPending, startTransition] = useTransition()

  // const inputChange = (e) => {  //* input输入时，取消上一次的请求，并发送新的请求
  //   const newQuery = e.target.value
  //   setQuery(newQuery)

  //   startTransition(() => {
  //     api.cancel()
  //     setApi(postApi(newQuery))
  //   })
  // }

  const deferred = useDeferredValue(api)

  const inputChange = (e) => {
    setQuery(e.target.value)

    api.cancel()
    setApi(postApi(e.target.value))
  }

  return (
    <>
      <input type="text" placeholder="search by number" onChange={inputChange} />
      <Suspense fallback={<div>loading...</div>}>
        <List api={deferred} isPending={api !== deferred} />
      </Suspense>
    </>
  )
}

const List = ({ api, isPending }) => {
  const posts = use(api)

  return (
    <ul>
      {posts.map((post) => (
        <div key={post.id} style={{ opacity: isPending ? 0.5 : 1 }}>
          <h2>{post.title}</h2>
          <p>postId: {post.postId}</p>
          <p>id: {post.id}</p>
          <p>email: {post.email}</p>
          <p>body: {post.body}</p>
        </div>
      ))}
    </ul>
  )
}