import React from 'react'
import DataSetSelector from './DataSetSelector'
import DataSetDisplay from './DataSetDisplay'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DataSets from './DataSets'

jest.mock('./DataSetDisplay')

function renderDataSetSelector (path) {
  return render(
    <MemoryRouter initialEntries={path ? [path] : undefined}>
      <DataSetSelector />
    </MemoryRouter>
  )
}

it('displays Kickstarter by default', done => {
  DataSetDisplay.mockImplementation((props) => {
    expect(props).toEqual(DataSets.kickstarter)
    done()
    return (<div/>)
  })

  renderDataSetSelector()
})

it('bad path redirects to Kickstarter', done => {
  DataSetDisplay.mockImplementation((props) => {
    expect(props).toEqual(DataSets.kickstarter)
    done()
    return (<div/>)
  })

  renderDataSetSelector('/abadpath')
})

it.each`
key
${'kickstarter'}
${'games'}
${'movies'}
`('bad path redirects to Kickstarter', ({ key }, done) => {
  DataSetDisplay.mockImplementation((props) => {
    expect(props).toEqual(DataSets[key])
    done()
    return (<div/>)
  })

  renderDataSetSelector(`/${key}`)
})
