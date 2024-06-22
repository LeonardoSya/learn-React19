import { use, useEffect } from 'react'
import { Context } from './context'

export default function Setting() {
  const { theme, counter, setTheme, setCounter } = use(Context)

  const handleThemeToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', nextTheme)
    setTheme(nextTheme)
    setCounter(counter + 1)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div>
      <button onClick={handleThemeToggle}>click to change to {theme === 'light' ? 'dark' : 'light'} theme</button>
      <div>you have changed {counter} times</div>
    </div>
  )
}