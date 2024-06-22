import { createContext, useState } from 'react'

// 创建名为Context的上下文，默认值为{theme:'dark'}
export const Context = createContext({ theme: 'light' })

export default function Provider({ children }: { children: React.ReactNode }) {

  //* 用useState创建了数据，并将操作数据的方法集成在value中，这样可以确保数据的变动能触发UI更新
  const [theme, setTheme] = useState('light')
  const [counter, setCounter] = useState(0)

  const value = {
    theme, setTheme, counter, setCounter
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}