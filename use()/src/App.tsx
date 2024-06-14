import {Suspense,use} from 'react'

const api = async() => {
  const res = await fetch('https://api.chucknorris.io/jokes/random')
  return res.json()
}

export default function App() {
  const __api = api()  // 初始化请求

  return (
    <>
      {/** 当组件内部用use()接收promise作为参数时，需要在组件外层使用Suspense */}
      {/** 当Suspense的子组件包含异步逻辑时，Suspense能够捕获到子组件的首次渲染异常 */}
      {/** 传递给Suspense的异步组件必须在报错时返回一个Promise对象，use(promise)被设计成完全符合Suspense规范的hook */}
      <Suspense fallback={<div>loading...</div>}>
        <Item api={__api} />
      </Suspense>
    </>
  )
}

const Item = (props) => {
  const joke = use(props.api)

  return (
    <>
      <div>
        {joke.value}
      </div>
    </>
  )
}
