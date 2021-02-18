import React, { useState, useEffect } from 'react';
import user from './Data/User'
import repos from './Data/Repos';
import followers from './Data/Followers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider =({children})=>{
    const [githubUser, setGithubUser] =useState(user)
    const [githubRepos, setGithubRepos] =useState(repos)
    const [githubFollowers, setGithubFollowers] =useState(followers)
    // using axios for github user
    const [isLoading, setIsLoading] = useState(false)
    const [requests, setRequests] = useState(0)
    const [error, setError] = useState({show:false, msg:""})
    
    //checking rate of response
    const checkRequests =() =>{
        axios(`${rootUrl}/rate_limit`)
        .then(({data})=>{
           let {rate:{remaining}} = data
           setRequests(remaining)
           if (remaining === 0){ 
              toggleError(true, 'hourly rate limit exceeded')
           }
        })
        .catch((error)=>console.log(error))
    }

    const toggleError =(show, msg)=>{
        setError({show,msg})
    }

    useEffect(checkRequests,[])
    
    return <GithubContext.Provider value={{ githubUser:githubUser, githubRepos, githubFollowers, requests, error }}>{children}</GithubContext.Provider>
}


export {GithubProvider, GithubContext}