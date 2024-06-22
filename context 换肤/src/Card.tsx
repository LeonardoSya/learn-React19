import { use } from 'react'
import {Context} from './context.tsx'

export default function Card() {
  // use()可以直接获取到Context
  const { theme } = use(Context)

  const classname = `card ${theme}`

  return (
    <>
      <div className={classname}>
        <div>Title</div>
        <p>The use API is currently only available in React's Canary and experimental channels. Learn more about React's release channels here.</p>
      </div>
    </>
  )
}