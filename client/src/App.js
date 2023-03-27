import Home from './component/Home';
import Navbar from './component/Navbar';
import logo from './logo.svg';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Buckets from './component/Buckets';
import Singup from './component/Singup';
import Login from './component/Login';
import History from './component/History';
import { createContext, useState } from 'react';
import Cards from './component/Cards';


export const MyContext = createContext();
function App() {
  
  const [bucketId,setBucketId]=useState(-1);
  const [userId,setUserId]=useState(-1);
  const [username,setUserName]=useState("User");
  // const backend = "http://localhost:5000";
  const backend = "https://json-server-vercel-eight-pi.vercel.app";
  return (
    <MyContext.Provider value={{userId,setUserId,username,setUserName,backend,bucketId,setBucketId}}>
      <BrowserRouter className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/buckets" element={<Buckets/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/signup" element={<Singup/>}/>
          <Route path="/bucketitems" element={<Cards/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
