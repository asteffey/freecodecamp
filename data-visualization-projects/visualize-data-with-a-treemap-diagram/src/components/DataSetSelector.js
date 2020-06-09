import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import DataSets from './DataSets'
import DataSetDisplay from './DataSetDisplay'
import styled from 'styled-components'

const Links = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const DataSetSelector = () => {
  const keys = Object.keys(DataSets)

  return (
    <>
      <Links>{
        keys.map(key => {
          const { title } = DataSets[key]
          return (
            <div key={key}>
              <Link to={`/${key}`}>{title}</Link>
            </div>
          )
        })
      }</Links>

      <Switch>
        <Route path={`/:key(${keys.join('|')})`}
          render={({ match: { params: { key } } }) =>
            <DataSetDisplay {...DataSets[key]} />
          }
        />
        <Redirect to={keys[0]}/>
      </Switch>
    </>
  )
}

export default DataSetSelector
