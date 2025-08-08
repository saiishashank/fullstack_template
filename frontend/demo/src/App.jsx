import './App.css'
import {Route,Routes} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
function App() {
<SignUp/>

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<LandingPage/>}/>
        <Route path='/about' element={<LandingPage/>}/>
        <Route path='/contact' element={<LandingPage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
      
    </>
  )
}

export default App
