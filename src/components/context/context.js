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



    return <GithubContext.Provider value={{ githubUser:githubUser, githubRepos, githubFollowers }}>{children}</GithubContext.Provider>
}


export {GithubProvider, GithubContext}