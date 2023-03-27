import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

function Singup() {
  const [uname,setUname]=useState("");
  const [pass,setPass]=useState("");
  const [cpass,setCpass]=useState("");
  const {backend}=useContext(MyContext);
  const nav=useNavigate();
  const handlesignup=async (e)=>{
    e.preventDefault();
    if(cpass==pass){
      const dt = await fetch(`${backend}/users?username=${uname}&_limit=1`,{method:"GET"});
      const res= await dt.json();
      if(res.length==0){
        await fetch(`${backend}/users`,{
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify({
            username:uname,
            password:pass
          })
        })
        nav("/login");
      }else{
        alert("username already exists");
      }
    }else{
      alert("password not matched")
    }
  }
  return (
    <div className='cover'>
      <form onSubmit={handlesignup} className="form" >
        <div className='top'>
          <h4>Sign Up</h4>
        </div>
        <div className='bottom' style={{flexDirection:'column',height:'200px',gap:"5px"}}>
          <input value={uname} placeholder="Enter Username" onChange={(e)=>{setUname(e.target.value)}} type="text" required/>
          <input value={pass} placeholder="Enter password" onChange={(e)=>{setPass(e.target.value)}} type="password" required/>
          <input value={cpass} placeholder="Confirm password" onChange={(e)=>{setCpass(e.target.value)}} type="password" required/>
          <div>
            <Link style={{marginRight:'10px',color:"black"}} to="/login">already have Account? Login</Link>
            <button className='sbtn' type='submit'>Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Singup