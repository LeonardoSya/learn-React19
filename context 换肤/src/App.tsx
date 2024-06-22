import Card from './Card.tsx'
import Setting from './Setting.jsx'
import Provider from './context.tsx'
import './App.css'

export default function App() {
  return (
    <Provider>
      <div>change themes and count</div>
      <Card />
      <Card />
      <Setting />
    </Provider>
  )
}