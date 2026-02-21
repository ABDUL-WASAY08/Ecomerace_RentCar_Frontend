import './App.css'
import Auth from './screens/Auth'
import { BrowserRouter ,Route,Routes } from 'react-router-dom'
import Dashboard from './screens/Dashboard'
function App() {
 

  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Auth/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
  </Routes>
  </BrowserRouter>
   
    </>
  )
}

export default App
