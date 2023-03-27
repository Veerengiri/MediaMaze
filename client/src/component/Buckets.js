import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App'

function Buckets() {
    const {userId,backend,setBucketId}=useContext(MyContext);
    const [buckets,setBuckets]=useState([]);
    const [bname,setBname]=useState("");
    const [loading,setLoading]=useState(false);
    const nav = useNavigate();
    const getData = async ()=>{
        setLoading(true);
        const dt = await fetch(`${backend}/buckets?userId=${userId}`,{
            method:"GET",
        })
        const res = await dt.json();
        setBuckets(res);
        // console.log(res);
        setLoading(false);
    }
    const createBucket = async (e)=>{
        e.preventDefault();
        if(bname==""){
            alert("invalid data");
            return;
        }
        await fetch(`${backend}/buckets`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:bname,
                userId:userId,
            })
        })
        document.getElementById('opform').style.display='none';
        getData();
        setBname("");
    }
    const deletebucket = async (bid)=>{
        if(window.confirm("Are you want to delete this bucket?")){
            await fetch(`${backend}/cards?bucketId=${bid}`,{method:"DELETE"});
            await fetch(`${backend}/buckets/${bid}`,{method:"DELETE"});
            getData();
        }
    }
    useEffect(()=>{
        if(userId==-1){
            nav("/login")
        }else{
            getData(); 
            document.getElementById('opform').style.display='none'
        }
    },[])
  return (
    <div>

       
        
        <div>
            <section className="bucket-section">
                <div id="buckettop">
                    <h1>Your Buckets</h1>
                    <div className="btn" id="createbtn">
                        <a  href="#" onClick={()=>{document.getElementById('opform').style.display='flex'}}>+ &nbsp; Create new bucket</a>
                    </div>
                </div>

                <div id="bottom">
                    <div className="bucket-list">
                        {loading?<h2>Loading...</h2>: buckets.map((el)=>{
                            return ( 
                                <div  className="bucket-name" id="bucket1">
                                    <h3 style={{cursor:"pointer",width:"80%"}} onClick={(e)=>{
                                    setBucketId(el.id);
                                    // console.log()
                                    nav("/bucketItems");
                                    }}>{el?.name}</h3>
                                    <div className="btn" id="deletebtn">
                                        <a href="#" onClick={(e)=>{deletebucket(el.id)}}>Delete</a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </section>
            {/* <!-- Create bucket form --> */}
            <div id='opform'  className="cover">
                <div className="form">
                    <div className="top">
                        <h4 >Create your bucket</h4>
                        <div className="btn" id="crossbtn">
                            <a href="#" onClick={()=>{document.getElementById('opform').style.display='none'}}><i className="fa fa fa-plus"></i></a>
                        </div>
                    </div>

                    <div className="bottom">
                    <form className="input" onSubmit={createBucket}>
                        <input value={bname} onChange={(e)=>{setBname(e.target.value)}} type="text" name="text" id="bucket-name" placeholder="Enter bucket name"/>

                        <div className="btn" id="createbtn">
                            <button type='submit' style={{padding:'10px 32px'}}>Create</button>
                        </div>
                    </form>

                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Buckets