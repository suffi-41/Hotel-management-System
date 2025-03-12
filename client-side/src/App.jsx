import { Outlet } from 'react-router-dom'
import './App.css'
import TopLodingBar from './components/TopLoddingBar'
import { useEffect } from 'react';

import { actionCreator } from "./redux/index";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import {logged_token} from "./utils/extra";

function App() {
  const token = logged_token();
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreator, dispatch);
  const amount = useSelector(state=>state.changeNumber)

  useEffect(()=>{
    if(token){
      action.login();
    }
  },[])
  return (
    <main className='w-screen h-screen overflow-auto'>
    <TopLodingBar/>    
     <Outlet/>
    </main>
    
  )
}

export default App
