import React from 'react'
import DataSetSelector from './DataSetSelector'
import { useFccTest, FccTests } from '@asteffey/react-fcc-test'
import { HashRouter as Router } from 'react-router-dom'

const App = () => {
  useFccTest({
    fccTest: FccTests.tree_map,
    queryParam: 'fcc-test'
  })

  return (
    <Router>
      <DataSetSelector />
    </Router>
  )
}

export default App
