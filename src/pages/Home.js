import React from 'react'
import Navbar from '../components/Navbar'
import UserSearch from '../components/UserSearch'
import Info from '../components/Info'
import User from '../components/User'
import Repository from '../components/Repository'



const Home =() => {
    
return (
     <main>
        <Navbar />
        <UserSearch />
        <Info />
        <User />
        <Repository />
    </main>
)
   
    
}
export default Home