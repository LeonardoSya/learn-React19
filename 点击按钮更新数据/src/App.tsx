import { Suspense, useState, use, useTransition } from "react"

const getApi = async () => {
  const res = await fetch('https://api.chucknorris.io/jokes/random')
  return res.json()
}

//* 当需要更新数据时，不需要再设计一个loading状态去记录数据是否正在发生请求行为
//* 因为Suspense帮助我们解决了Loading组件的显示问题
//* use()又帮助我们解决数据获取的问题，因此不需要设计一个状态去存储数据
//* 因此可以把创建的promise作为状态值来触发组件的重新执行，每次点击，都创建新的promise


export default function App() {
  // const [api, setApi] = useState<Promise<unknown> | null>(null)
  const [api, setApi] = useState(getApi)  // 初始化一个Promise并将Promise作为状态存储
  // 更简洁的状态设计，也是 React 19 所倡导的开发思路。

  const [isPending, startTransition] = useTransition()

  const __clickToGetMessage = () => {
    startTransition(() => {
      setApi(getApi())  // 每次点击，都会创建新的promise并更新状态
    })
  }

  return (
    <>
      <button onClick={__clickToGetMessage}>获取数据</button>
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <Item api={api} isPending={isPending} />
        </Suspense>
      </div>
    </>
  )
}

const Item = (props: {api: Promise<unknown>, isPending: boolean}) => {
  const {isPending, api} = props

  //* api的初始值是null，在Item子组件中直接把api传给use肯定会报错，
  //* 因为Suspense只会捕获子组件的 promise 异常，而不是所有异常
  //* 因此，在Item组件中，我们需要做一个判断，当api为null时直接返回，这样让use(null)得不到执行的时机

  if (!api) {
    console.log('初始化 api===null')
    return (
      <div>nothing</div>
    )
  }

  // use() 允许在组件渲染过程中调用异步函数，如果异步操作尚未完成，React会自动暂停组件的渲染
  const joke = use(props.api)
  return (
    <div style={{opacity: isPending? 0.5:1}}>{joke.value}</div>
  )
}