import { useState } from 'react'
import CamKit from './screens/CamKit'
import Login from './screens/Login'

import { AuthContext } from './utils/context/loginAuthContext'



function App() {
 const [auth , setAuth] = useState(false)
 const [currentLensIndex, setCurrentLensIndex] = useState(0);
 const [lensesLength, setLensesLength] = useState(0);
 const [lensesFetch , setLensesFetch] = useState([{}])
 const [camSession, setCamSession] = useState(null);

  return (
    <>
    <AuthContext.Provider value={{auth,setAuth,currentLensIndex,setCurrentLensIndex,lensesLength,setLensesLength,lensesFetch,setLensesFetch,camSession,setCamSession}}>
      {auth &&
      <CamKit />
      }
   {!auth &&
   <Login/>
   } 
    </AuthContext.Provider>    
    </>
  )
}

export default App
