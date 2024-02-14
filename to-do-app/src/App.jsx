import { useState , useEffect } from 'react'
import React from "react";

import './App.css'
import Navbar from './components/Navbar'
import Cards from './components/card'
import axios from 'axios'
import Title from 'antd/es/skeleton/Title';

const baseurl = "https://apis-production-145a.up.railway.app/api/todo"

function App() {

const[data , setUserData] =useState([])


const fetchData = async ()=>{
  const res= await axios.get(baseurl ,{
    headers:{
      Authorization: 'baf0b04b-f443-447c-8706-c379963fddc5'
    }
  })
  setUserData(res.data);
  console.log(res.data)
}

useEffect(()=>{
  fetchData()
},[])


  function createPost() {
    axios
      .post(baseurl, {
        title: "Hello World!",
        body: "This is a new post."
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  function update_todo(){}
  



  return (
    <>
    <div className="Header">
      <div className="nav">
        <Navbar/>
      </div>
      <div className="cards1">
        <Cards/>
      </div>
    </div>
    </>
  )
}



export default App
