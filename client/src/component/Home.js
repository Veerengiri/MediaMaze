import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyContext } from '../App';

function Home() {
  const nav = useNavigate();
  const {backend,setUserId,setUserName,username}=useContext(MyContext);
  const firstpass = async ()=>{
    let uid = window.localStorage.getItem("zfys");
    if(uid){
      const dt = await fetch(`${backend}/users?id=${uid}`);
      const res = await dt.json();
      if(res.length>0){
        setUserId(uid);
        setUserName(res[0].username);
      }
    }
  }
  useEffect(()=>{
    firstpass();
  },[])
  return (
    <div>
      
      <section class="hero-section">
        <div class="text">
            <h3>Hello <span>{username}</span> </h3>
            <h3>Welcome to <span>Media Maze.</span></h3>
            <p id="tagline"> A faster way to store your Content. </p>
            <p id="desc">Welcome to Media Maze, the ultimate media link organizer! With our platform, you can easily store and categorize all your important media links in one place. </p>
            <p id='desc'>Create custom buckets for your favorite content, whether it's  videos, music playlists, or cooking tutorials. Add links to your buckets with just a few clicks, and update or delete them as needed.</p>
            <p id='desc'>And with our built-in history feature, you can keep track of all the media content you've viewed in the past, so you never have to worry about losing track of what you've watched.
Get started today and take control of your media links with Media Maze!</p>
            <div class="btn" id="trybtn">
                <Link to="/buckets">Let's Go</Link>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Home