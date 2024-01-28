
import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import New from "./components/New"
import All from './components/All'
function App() {

  return (
    <>
      <BrowserRouter>

<Routes>
  <Route path='/' element={<All/>}/>
  <Route path='/new' element={<New/>}/>

</Routes>


      </BrowserRouter>
    </>
  )
}

export default App
