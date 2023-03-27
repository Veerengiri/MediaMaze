import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

function Login() {
  const {backend,setUserId,setUserName}=useContext(MyContext);
  const [uname,setUname]=useState("");
  const [pass,setPass]=useState("");
  const nav = useNavigate();
  const [login,setLogin]=useState("Log In");
  const handlesubmit = async (e)=>{
    e.preventDefault();
    setLogin("Please Wait...");
    const dt = await fetch(`${backend}/users?username=${uname}&_limit=1`,{method:"GET"});
    const res= await dt.json();
    if(res.length==0){
      alert("user not exist")
    }else{
      if(res[0]?.password==pass){
        setUserId(res[0].id);
        setUserName(res[0].username);
        window.localStorage.setItem("zfys",res[0].id);
        setTimeout(() => {
          nav("/");
        }, 500);
      }else{
        alert("error in email or password...")
      }
      setLogin("Log In");
    }
  }
  return (
    <div className='cover'>
      <form className='form' onSubmit={handlesubmit}>
        <div className='top'>
          <h4>Login</h4>
        </div>
        <div className='bottom' style={{flexDirection:'column',height:'100%',gap:"5px"}}>
          <input value={uname} onChange={(e)=>{setUname(e.target.value)}} type="text" placeholder='Enter UserName' required/>
          <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder='Enter Password' required/>
          <div>
            <Link style={{marginRight:'10px',color:"black"}} to="/signup">SignUp</Link>
            <button className='sbtn' type='submit'>{login}</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login