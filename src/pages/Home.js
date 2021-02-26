import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import UserSearch from '../components/UserSearch'
import Info from '../components/Info'
import User from '../components/User'
import Repository from '../components/Repository'
import { GithubContext } from '../components/context/context'
import loader from '../components/images/preloader.gif'



const Home =() => {
    const {isLoading} = useContext(GithubContext)
    if(isLoading){
        return (
        <main>
            <Navbar />
            <UserSearch />
            <img src={loader} className="loading-img" alt="Loading image"/>
        </main>
        )
    }
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