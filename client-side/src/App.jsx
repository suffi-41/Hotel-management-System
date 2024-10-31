import { Outlet } from 'react-router-dom'
import './App.css'
import TopLodingBar from './components/TopLoddingBar'




function App() {

  return (
    <main className='w-screen h-screen overflow-auto'>
    <TopLodingBar/>    
     <Outlet/>
    </main>
    
  )
}

export default App
