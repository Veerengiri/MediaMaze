import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyContext } from '../App'
function Navbar() {
    const {userId,setUserId,setUserName}=useContext(MyContext);
    const nav= useNavigate();
  return (
    // <div>
    //     <Link to="/">Home </Link>
    //     <Link to="/history">History </Link>
    //     <Link to="/buckets">Buckets </Link>
    //     <Link style={{display:`${userId!=-1?"none":"unset"}`}} to="/login">Login </Link>
    //     <button style={{display:`${userId==-1?"none":"unset"}`}}  onClick={()=>{setUserId(-1)}}>Logout</button>
    // </div>
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Media Maze</Link>
      </div>

      <ul>
          <Link to="/" style={{textDecoration:"none",color:'white'}}><li>Home</li></Link>
          <Link to="/buckets" style={{textDecoration:"none",color:'white'}}><li>Buckets</li></Link>
          <Link to="/history" style={{textDecoration:"none",color:'white'}}><li>History</li></Link>
      </ul>

      <div className="logbtn">
        <Link style={{display:`${userId!=-1?"none":"unset"}`}} to="/login">Login </Link>
        <a style={{display:`${userId==-1?"none":"unset"}`}}  onClick={()=>{
          setUserName("User");
          setUserId(-1);
          window.localStorage.removeItem("zfys");
          nav("/")
          }}> Logout </a>
      </div>
    </nav>

  )
}

export default Navbar