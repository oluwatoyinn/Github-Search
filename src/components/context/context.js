import React, { useState, useEffect, createContext } from 'react';
import user from './Data/User'
import repos from './Data/Repos';
import followers from './Data/Followers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider =({children})=>{

    const [githubUser, setGithubUser] =useState(user)
    const [githubRepos, setGithubRepos] =useState(repos)
    const [githubFollowers, setGithubFollowers] =useState(followers)
    
    // using axios for github user
    const [isLoading, setIsLoading] = useState(false)
    const [requests, setRequests] = useState(0)
    const [error, setError] = useState({show:false, msg:''})

    const searchGithubUser =  async(githubUser)=>{ 
        toggleError()
        setIsLoading(true)  
        const response= await axios(`${rootUrl}/users/${githubUser}`)
        .catch(error => console.log(error))
         
        if(response){
            setGithubUser(response.data) 
            const {login, followers_url} = response.data
            // repository
            // axios(`${rootUrl}/users/${login}/repos?per_page=100`)
            // .then(response=> setGithubRepos(response.data))
            // followers
            // axios(`${followers_url}?per_page=100`)
            // .then(response=>setGithubFollowers(response.data))
            await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),
            axios(`${followers_url}?per_page=100`)])
            .then((results)=>{ 
                const [repos, followers] = results
                const status = 'fulfilled'
                if(repos.status === status){
                    setGithubRepos(repos.value.data)
                }
                if(followers.status === status){
                    setGithubFollowers(followers.value.data)
                }
                // console.log(results);
            })
//   "followers_url": "https://api.github.com/users/oluwatoyinn/followers",

        }else{
            toggleError(true, 'no username found') 
        }
        checkRequests()
        setIsLoading(false)
    }
    
    //checking rate of response
    const checkRequests = () =>{
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

    const toggleError =(show = false, msg ='')=>{
        setError({show,msg})
    }

    useEffect(checkRequests,[])
    
    return <GithubContext.Provider value={{ githubUser:githubUser, 
                                            githubRepos,
                                            githubFollowers, 
                                            requests, 
                                            error, searchGithubUser,isLoading
                                         }}>{children}</GithubContext.Provider>
}


export {GithubProvider, GithubContext}