
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './assets/components/Navbar'

function App() {
 

  return (
    <>
     <header>
      <Navbar></Navbar>
     </header>
     <main className='my-10'>
      <Outlet></Outlet>
     </main>
      
    
    </>
  )
}

export default App
