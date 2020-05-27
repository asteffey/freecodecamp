import React from 'react'
import { render } from '@testing-library/react'
import EducationAttainment from './index'

jest.mock('./d3')

it('User Story #1: My choropleth should have a title with a corresponding id="title"', () => {
  const { container } = render(<EducationAttainment />)

  const title = container.querySelector('#title')
  expect(title).toBeInTheDocument()
})

it('User Story #2: My choropleth should have a description element with a corresponding id="description".', () => {
  const { container } = render(<EducationAttainment />)

  const description = container.querySelector('#description')
  expect(description).toBeInTheDocument()
})
