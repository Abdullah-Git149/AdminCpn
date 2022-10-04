import React, { useEffect } from 'react'
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { token } from "./store/slices/userSlice"
import Layout from './components/Layout/Layout';
import ContextProvider from "./context/context"
import { getStatus } from './store/slices/couponSlice';
import Spinner from './components/Spinner';

function App() {
  const status = useSelector(getStatus)
  const dispatch = useDispatch()
  console.log(status)
  useEffect(() => {
    try {
      dispatch(token())
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <ContextProvider > 
      <Layout />
    </ContextProvider>
  );
}

export default App;
