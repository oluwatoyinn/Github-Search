import React, { useContext } from 'react'
// import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
import { GithubContext } from './context/context';
import ReposCharts from  "./FusionCharts/ReposCharts"
import Pie3dChart from './FusionCharts/Pie3dChart'
import DoughnutChart from './FusionCharts/DoughnutStarChart'
import styled from 'styled-components'


const Repository = () => {
    const {githubRepos} = useContext(GithubContext)
    // console.log(githubRepos)
  const languages = githubRepos.reduce((total, item)=>{
      const {language,stargazers_count} = item
      if (!language) return total
      if (!total[language]){
        total[language] = {label:language, value:1, stars:stargazers_count}
      } else{
        total[language]= {...total[language], value:total[language].value + 1,stars:total[language].stars +stargazers_count }
      }
     return total; 
    },{})
    // console.log(languages)
     const mostUsedLanguage= Object.values(languages).sort((a,b)=>{
        return b.value - a.value
    }).slice(0, 5)

    // most stars per language
     const mostPopular = Object.values(languages).sort((a,b)=>{
        return b.stars - a.stars
     }).map((item)=>{
        return {...item, value:item.stars}
     }).slice(0,5)
    //  console.log(mostPopular);

    const chartData = [
      {
        label: "JavaScript",
        value: "80"
      },
      {
        label: "CSS",
        value: "130"
      },
      {
        label: "HTML",
        value: "30"
      },
    ];

    return <section className="section">
      <Wrapper className="section-center">
        <Pie3dChart data={mostUsedLanguage} />
        <div></div>
        <DoughnutChart data={mostPopular} /> 
        <div></div>
      </Wrapper>
    </section>
    
    
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repository