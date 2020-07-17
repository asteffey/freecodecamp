import React from 'react'
import styled from 'styled-components'
import Project from './Project'
import useProjects from '../hooks/useProjects'

const ProjectList = styled.div`
  width: 1230px;
  max-width: 100%;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 3.56vw;

  @media (min-width: 445px) {
    font-size: 16px;
  }
`

const Projects = () => {
  const projects = useProjects()

  return (
    <ProjectList>
      {
        projects?.map((project, index) =>
          <Project key={index} {...project}/>
        )
      }
    </ProjectList>
  )
}

export default Projects
