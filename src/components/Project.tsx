import React from 'react'
import styled from 'styled-components'
import externalIcon from './external-link.svg'
import githubIcon from './github.svg'

const ProjectTile = styled.div`
  display: block;
  width: 90vw;
  height: 67.5vw;
  max-width: 400px;
  max-height: 300px;
  margin: 3px;
  padding: 0;
  position: relative;
  border: 2px ridge rgba(0, 0, 0, 0.3);
  
  >img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    visibility: visible;
    opacity: 1;
    transition: visibility 0.3s, opacity 0.3s linear;
  }
  
  :hover>img,
  :active>img {
      visibility: hidden;
      opacity: 0;
  }
`

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #eee;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 1.25em 1.25em;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  
  h3 {
    margin: 3px;
    font-size: 1.5em;
  }
  
  h4 {
    margin: 0.3125em;
    font-style: oblique;
    color: #334;
    font-weight: 500;
  }
  
  p {
    font-weight: 600;
    font-size: 0.9em;
  }
`

const Links = styled.div`
  position: absolute;
  bottom: 0.9375em;
  height: 1.875em;
  line-height: 1.875em;
  display: flex;
  
  a {
    display: flex;
    text-decoration: none;
    margin-right: 1.25em;
    color: black;
    font-weight: 700;
  }
  a:hover {
    color: #e31b3c;
  }
  
  a > img {
    height: 1.875em;
    width: 1.875em;
    margin-right: 0.375em;
  }
  a:hover > img {
    filter: invert(20%) sepia(89%) saturate(3056%) hue-rotate(338deg) brightness(89%) contrast(100%);
  }
`

const Project = ({ id, name, tags, website, github, description }: Project) => {
  console.log(id)
  return (
    <ProjectTile>
      <img src={`images/screenshots/${id}.png`} alt={name} />
      <Info>
        <h3>{name}</h3>
        <h4>{tags.join(', ')}</h4>
        <p>{description}</p>
        <Links>
          <a href={github} target='_blank' rel='noopener noreferrer'>
            <img src={externalIcon} alt='Link to site'/>
            View Site
          </a>
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <img src={githubIcon} alt='View source at GitHub'/>
            View Source
          </a>
        </Links>
      </Info>
    </ProjectTile>
  )
}

export default Project
