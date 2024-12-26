import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen pt-8  w-full bg-red-400 flex justify-between flex-col'>
            <img className="w-16 ml-8"src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png' alt='Uber logo'/>
            <div className='bg-white py-5 px-10 pb-7'>
                <h2 className='text-3xl font-bold '>Get Started with Uber</h2>
                <Link to='/user/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4 '>Continue</Link>
            </div>
        </div>
      
    </div>
  )
}

export default Home
 