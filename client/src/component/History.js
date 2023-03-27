import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App'

function History() {
  const nav = useNavigate();
  const [loading,setLoading]=useState(false);
  const {backend,userId}=useContext(MyContext);
  const [history,setHistory]=useState([]);
  const gethistory=async ()=>{
    setLoading(true);
    const dt  = await fetch(`${backend}/history?userId=${userId}&_sort=fulltime&_order=desc`);
    const res = await dt.json();
    setHistory(res);
    setLoading(false);
  }
  const deletehistroy=async (id)=>{
    await fetch(`${backend}/history/${id}`,{method:"DELETE"});
    gethistory();
  }
  useEffect(()=>{
    if(userId==-1){
      nav("/login");
    }else{
      gethistory();
    }
  },[])
  return (
    <div>
      
      <section class="history-section">
        <div id="historytop">
            <h1>History</h1>
        </div>

        <div id="bottom">
            <div class="history-list">
              {loading?<h2>Loading...</h2>: history.map((el)=>{
                return (
                  <>
                    <div class="history-name" id="history1">
                      <div id='histroyname'>
                        <h3>{el?.name}</h3>
                        <span class="link">
                            <a href={el?.url}>{el?.url}</a>
                        </span>
                      </div>
                      <div class="btn" id="deletebtn">
                          <a href="#" onClick={()=>{deletehistroy(el.id)}}>Delete</a>
                      </div>
                      <div class="time">
                          <span>Last modified on </span>
                          <span>{el?.date} </span>
                          <span>{el?.time} </span>
                      </div>
                    </div>
                  </>
                )
              })}
              

            </div>
        </div>

    </section>
    </div>
  )
}

export default History

