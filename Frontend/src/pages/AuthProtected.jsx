import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthProtected({children,current}) {
    const user=useSelector((state)=>state.user.isAuthenticated);
    const captain=useSelector((state)=>state.captain.isAuthenticated);
    const navigate=useNavigate();
    // console.log("user:",user);
    // console.log("captain:",captain);
    useEffect(()=>{
        if(user && !captain){
            navigate("/user/home");
        }
        else if(captain && !user){
            navigate("/captain/home");
        }
    },[user,captain,navigate])
  return (
    <div>
        {children}      
    </div>
  )
}

export default AuthProtected
