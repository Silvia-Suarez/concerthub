// import { useState } from 'react'
import "./styles/global.css"
import './App.css'
import Navbar from'./components/layout/Navbar'
import ConcertList from './components/concerts/ConcertList'
import { concerts } from './data/concert'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Navbar></Navbar>
    <main>
      <h1>Upcoming ...</h1>
      <ConcertList concerts={concerts}></ConcertList>
    </main>
    </>
  )
}

export default App
