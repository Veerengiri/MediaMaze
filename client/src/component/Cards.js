import React, { useContext, useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App'

function Cards() {
  const {backend,bucketId,userId}=useContext(MyContext);
  const [cname,setCname]=useState("");
  const [buckets,setBuckets]=useState([]);
  const [iurl,setIurl]=useState("");
  const [cid,setCid]=useState(-1);
  const [curl,setCurl]=useState("");
  const [isUpdate,setIsUpdate]=useState(false);
  const [moveElement,setMoveElement]=useState(null);
  const [data,setData]=useState([]);
  const [dselection,setDeleteselection]=useState([]);
  const [bucketname,setBucketname]=useState("Bucket");
  const [loading,setLoading]=useState(false);
  const [mloading,setMLoading]=useState(false);
  const [moving,setMoving]=useState("Select Bucket");
  const [deleting,setDeleting]=useState("Select card for delete");
  const [addItem,setAddItem]=useState("Submit");
  const nav= useNavigate();
  
  const getdt = async ()=>{
    setLoading(true);
    const dt = await fetch(`${backend}/cards?bucketId=${bucketId}`);
    const res = await dt.json();
    setData(res);
    setLoading(false);
  }
  const pushHistroy=async (element)=>{
    let a = new Date();
    const date = ""+a.getDate()+"-"+(a.getMonth()+1)+"-"+a.getFullYear();
    const time = ""+a.getHours()+":"+a.getMinutes();
    await fetch(`${backend}/history`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name:element.name,
        url: element.url,
        date,
        time,
        fulltime: Date.now(),
        userId:userId
      })
    })
  }
  const createItem = async (e)=>{
    e.preventDefault();
    setAddItem("Wait...");
    if(cname=="" || curl==""){
        alert("invalid data");
        return;
    }
    if(isUpdate){
      await fetch(`${backend}/cards/${cid}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:cname,
            url: curl,
            bucketId: bucketId
        })
    })
    }else{
      await fetch(`${backend}/cards`,{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              name:cname,
              url: curl,
              bucketId: bucketId
          })
      })
    }
    document.getElementById('opform').style.display='none';
    getdt();
    setCname("");
    setCurl("");
    setAddItem("Submit")
  }
  const deleteItem = async (id)=>{
    await fetch(`${backend}/cards/${id}`,{method:"DELETE"})
    getdt();
  }
  const updateform = async (item)=>{
    setIsUpdate(true);
    setCid(item.id);
    setCname(item?.name);
    setCurl(item?.url);
    document.getElementById('opform').style.display='flex';
  }
  const moveToanother = async (el)=>{
    setMLoading(true);
    getBdata();
    setMoveElement(el);
    document.getElementById('moveto').style.display="flex";
  }
  const moveToThis = async (bcid)=>{
    setMoving("Just A Sec...");
    if(moveElement==null){
      alert("Select element")
      return;
    }
    await fetch(`${backend}/cards/${moveElement.id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        id:moveElement.id,
        name:moveElement.name,
        url:moveElement.url,
        bucketId: bcid
      })
    })
    setMoveElement(null);
    getdt();
    document.getElementById('moveto').style.display="none";
    setMoving("Select Bucket");
  }
  const getBdata = async ()=>{
    
    const dt = await fetch(`${backend}/buckets?userId=${userId}`,{
        method:"GET",
    })
    const res = await dt.json();
    setBuckets(res);
    // console.log(res);
    setMLoading(false);
}
  const getbname = async ()=>{
    const dt = await fetch(`${backend}/buckets?id=${bucketId}`);
    const res = await dt.json();
    setBucketname(res[0].name);
  }
  const openselectioncard= ()=>{
    document.getElementById('deleteselect').style.display="flex";
  }
  const additemfordelet = (id)=>{
    let newdt = dselection;
    if(dselection.includes(id)){
      let abc = [];
      newdt.forEach(el => {
        if(id!=el){
          abc.push(el);
        }
      });
      setDeleteselection(abc);
      document.getElementById(id).style.border="0px solid red"
    }else{
      newdt.push(id);
      setDeleteselection(newdt);
      document.getElementById(id).style.border="2px solid red"
    }
  }
  const resetdelsel=()=>{
    dselection.forEach(el => {
      document.getElementById(el).style.border= "none";
    });
    setDeleteselection([]);
  }
  const deleteselectedelements = async ()=>{
    setDeleting("Just A Sec...");
    if(dselection.length==0){
      alert("please select any item for delete....")
      return;
    }
    dselection.forEach(async el => {
      await fetch(`${backend}/cards/${el}`,{method:"DELETE"});
    });
    getdt();
    resetdelsel();
    document.getElementById('deleteselect').style.display="none";
    setDeleting("Select card for delet")
  }
  useEffect(()=>{
    if(bucketId==-1 || userId==-1){
      nav("/login");
    }else{
      getdt();
      document.getElementById('opform').style.display='none';
      document.getElementById('iframevid').style.display="none";
      document.getElementById('moveto').style.display="none";
      document.getElementById('deleteselect').style.display="none";
      getbname()
    }
  },[])
  return (
    <div >
      <div className="Cardheading" >
        <h1>{bucketname} - Cards</h1> 
        <div className='afterhead'>
          <div className="btn createbtn" id="addmedia">
              <a href='#' onClick={()=>{document.getElementById('opform').style.display='flex';setCname("");setCurl("")}}>+ &nbsp; Add Media</a>
          </div>
          <div className='btn' id='cardsdelete' style={{marginLeft:"10px"}}>
            <a href="#" onClick={openselectioncard}>Select for delete</a>
          </div>
        </div>
      </div>
      <div id='iframevid' style={{position:"fixed",top:0,height:'100vh',width:'100vw',backgroundColor:'black',zIndex:3}}>
        <div className='btn' style={{position:"fixed",top:10,right:5}}>

        <a  onClick={()=>{setIurl("");document.getElementById('iframevid').style.display="none";}}>close</a>
        </div>
        <iframe id='myIframe'  src={iurl}  height='100%' width='100%'  allowFullScreen frameborder="0" autoPlay></iframe>
      </div>
      <div>
        {/* <button onClick={()=>{document.getElementById('opform').style.display='unset'}}>Add Media</button> */}
      </div>
      <div id="deleteselect" className="cover">
        <div className='form'>
          <div className="top">
            <h4>{deleting}</h4>
            <div className="btn" id="crossbtn">
                <a href="#" onClick={()=>{document.getElementById('deleteselect').style.display='none'}}><i className="fa fa fa-plus"></i></a>
            </div>
          </div>
          <div className="bottom" style={{flexDirection:'column',height:'unset'}}>
            {data.map((el)=>{
              return (
                <div id={el.id} className='blist' onClick={()=>{additemfordelet(el.id)}} style={{cursor:"pointer"}} >
                  <p>{el.name}</p>
                </div>
              )
            })}
            <div>
            <button style={{marginRight:'10px'}} className='sbtn' onClick={resetdelsel}>Reset</button>
            <button className='sbtn' href="#" onClick={deleteselectedelements}>Delete selected cards</button>
            </div>
          </div>
        </div>
      </div>
      <div id='moveto' className='cover' >
        <div className='form'>
          <div className='top' >
            <h4>{moving}</h4>
            <div className="btn" id="crossbtn">
                <a href="#" onClick={()=>{document.getElementById('moveto').style.display='none'}}><i className="fa fa fa-plus"></i></a>
            </div>
          </div>
          <div className='bottom' style={{flexDirection:'column',height:'unset'}}>
            {mloading? <h2>Loading...</h2>: buckets.map((el)=>{
              return (
                <div className='blist' style={{cursor:'pointer'}} onClick={()=>{
                    moveToThis(el.id);
                }}>
                  <p>{el?.name}</p>
                </div>
              )
            })}
            
          </div>
        </div>
      </div>
      <div id='opform'  className="cover">
          <div className="form">
              <div className="top">
                  <h4 >Add Media</h4>
                  <div className="btn" id="crossbtn">
                      <a href="#" onClick={()=>{document.getElementById('opform').style.display='none'}}><i className="fa fa fa-plus"></i></a>
                  </div>
              </div>
              <div className="bottom">
                <form className="input" onSubmit={createItem} >
                    <input value={cname} onChange={(e)=>{setCname(e.target.value)}} type="text" name="text" id="bucket-name" placeholder="Enter name"/>
                    <input value={curl} onChange={(e)=>{setCurl(e.target.value)}} type="url" placeholder='Enter url here' />
                    <div className="btn" id="createbtn">
                        <button type='submit'>{addItem}</button>
                    </div>
                </form>
              </div>
          </div>
      </div>
      <div className='Card-list'>
        {loading?<h2>Loading...</h2>: data.map((el)=>{
          return ( <div className='specificCard' >
            <div className='cbtns'>   
              <a className='navgatecards' href="#" onClick={()=>{updateform(el)}}>✏️</a>
              <a className='navgatecards' href="#" onClick={()=>{moveToanother(el)}}>⬆️</a>
              <a className='navgatecards' href="#" onClick={()=>{deleteItem(el.id)}}>❎</a>
            </div>
            <div onClick={()=>{pushHistroy(el);}} >
              <div style={{cursor:'pointer'}} onClick={()=>{
                setIurl(el.url);
                document.getElementById('iframevid').style.display="unset";
                }} >
                  <div className='cIframe'>
                    <iframe src={el.url} frameborder="0"></iframe>
                  </div>
                  <h3 style={{paddingLeft:'10px'}}>{el?.name}</h3>
              </div>
              <div className='cplinkpart'>
                <a href={el.url} target="_blank" style={{textDecoration:'none'}} >{el?.url}</a>
              </div>
            </div>
          </div>
           )
        })}
      </div>
    </div>
  )
}

export default Cards